import { ProductModel } from "../database/models/Product";
import { AppError } from "../utils/app-errors";
import axios from "axios";
import { BASE_URL } from "../config";
import mongoose from "mongoose";

export class ProductService {
 async CreateProduct(data: {
  name: string;
  price: number;
  companyId: string;
  imgUrl: string;
  identityLogin: string;
 }) {
  try {
   const { name, price, companyId, imgUrl, identityLogin } = data;
   if (!name || !price || !companyId || !imgUrl) {
    throw AppError.badRequest("All fields should be filled!");
   }
   await this.CheckCompanyById({ companyId, identityLogin });
   const product = new ProductModel({
    name,
    price,
    companyId,
    imgUrl,
   });
   const doc = await product.save();
   return doc;
  } catch (err) {
   throw err;
  }
 }

 async GetProductById(data: { productId: string }) {
  try {
   if (!mongoose.Types.ObjectId.isValid(data.productId)) {
    throw AppError.badRequest("Wrong id format!");
   }
   const product = await ProductModel.findOne({ _id: data.productId });
   if (!product) {
    throw AppError.badRequest("Wrong product id!");
   }
   return product;
  } catch (err) {
   throw err;
  }
 }

 async GetProductByCompanyId(data: { companyId: string }) {
  try {
   if (!mongoose.Types.ObjectId.isValid(data.companyId)) {
    throw AppError.badRequest("Wrong id format!");
   }
   const products = await ProductModel.find({ companyId: data.companyId });
   return products;
  } catch (err) {
   throw err;
  }
 }

 async RateProduct(data: {
  productId: string;
  identity: string;
  rating: number;
 }) {
  try {
   const { productId, identity, rating } = data;
   if (!rating || rating > 5 || rating < 1) {
    throw AppError.badRequest("Wrong input!");
   }
   if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw AppError.badRequest("Wrong id format!");
   }
   const product = await ProductModel.findOne({ _id: data.productId });
   if (!product) {
    throw AppError.badRequest("Wrong product id!");
   }
   if (product.ratings.filter((r) => r.userId === identity).length > 0) {
    throw AppError.badRequest("You have already rated this!");
   }
   const updatedProduct = await ProductModel.findOneAndUpdate(
    { _id: data.productId },
    {
     $push: { ratings: { userId: identity, value: rating } },
     avgRating:
      (product.avgRating * product.ratings.length + rating) /
      (product.ratings.length + 1),
    },
    { returnOriginal: false }
   );
   return updatedProduct;
  } catch (err) {
   throw err;
  }
 }

 async DeleteRating(data: { productId: string; identity: string }) {
  try {
   const { productId, identity } = data;
   if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw AppError.badRequest("Wrong id format!");
   }
   let product = await ProductModel.findOne({ _id: data.productId });
   if (!product) {
    throw AppError.badRequest("Wrong product id!");
   }
   if (product.ratings.filter((r) => r.userId === identity).length === 0) {
    throw AppError.badRequest("You have not rated yet!");
   }
   product.avgRating =
    (product.avgRating * product.ratings.length -
     product.ratings.find((r) => r.userId === identity).value) /
     (product.ratings.length - 1) || 0;
   product.ratings.splice(
    product.ratings.findIndex((r) => r.userId === identity),
    1
   );
   const updatedProduct = await product.save();
   return updatedProduct;
  } catch (err) {
   throw err;
  }
 }

 async CheckCompanyById({
  companyId,
  identityLogin,
 }: {
  companyId: string;
  identityLogin: string;
 }) {
  try {
   const payload = {
    event: "GET_COMPANY_BY_ID",
    data: { companyId },
   };
   const company = (await axios.post(`${BASE_URL}/company/app-events/`, {
    payload,
   })) as { data: { owner: string; admins: string[] } };

   if (
    !company.data.admins.includes(identityLogin) &&
    company.data.owner !== identityLogin
   ) {
    throw AppError.badRequest("You've got no rights to moderate this company!");
   }
   return true;
  } catch (err) {
   if (err.response && err.response.status >= 500) {
    throw AppError.internal(
     "The foreign service is unavailable at this time. Please try again later."
    );
   }
   throw err;
  }
 }
}
