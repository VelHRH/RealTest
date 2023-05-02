import { ProductModel } from "../database/models/Product";
import { AppError } from "../utils/app-errors";
import axios from "axios";
import { BASE_URL } from "../config";

export class ProductService {
 async CreateProduct(data: {
  name: string;
  price: number;
  companyId: string;
  imgUrl: string;
  identity: string;
 }) {
  try {
   const { name, price, companyId, imgUrl, identity } = data;
   if (!name || !price || !companyId || !imgUrl) {
    throw AppError.badRequest("All fields should be filled!");
   }
   await this.CheckCompanyById({ companyId, identity });
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

 async CheckCompanyById({
  companyId,
  identity,
 }: {
  companyId: string;
  identity: string;
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
    !company.data.admins.includes(identity) &&
    company.data.owner !== identity
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
