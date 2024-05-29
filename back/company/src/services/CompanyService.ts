import { AppError } from "../utils/app-errors";
import { CompanyModel } from "../database/models/Company";
import mongoose from "mongoose";

export class CompanyService {
  async CreateCompany(data: {
    name: string;
    owner: string;
    avatarUrl: string;
    description: string;
  }) {
    try {
      const { name, owner, avatarUrl, description } = data;
      if (!owner || !avatarUrl || !name) {
        throw AppError.badRequest("All fields should be filled!");
      }
      const existingName = await CompanyModel.findOne({ name });
      if (existingName) {
        throw AppError.badRequest("Company with the name already exists");
      }

      const company = new CompanyModel({
        name,
        owner,
        description,
        avatarUrl,
      });
      const doc = await company.save();

      return doc;
    } catch (err) {
      throw err;
    }
  }

  async DeleteCompany(data: { _id: string; owner: string }) {
    try {
      const { _id, owner } = data;
      const existingCompany = await CompanyModel.findOne({ _id });
      if (!existingCompany) {
        throw AppError.badRequest("You are deleting unexistent company");
      }
      if (existingCompany.owner !== owner) {
        throw AppError.badRequest("You are not an owner");
      }

      await CompanyModel.findOneAndDelete({ _id });

      return { success: true };
    } catch (err) {
      throw err;
    }
  }

  async GetCompany({ companyId }: { companyId: string }) {
    try {
      const company = await CompanyModel.findById(companyId);
      if (!company) {
        throw AppError.badRequest("The company doesn't exist!");
      }
      return company;
    } catch (err) {
      throw err;
    }
  }

  async GetAllCompanies() {
    try {
      const companies = await CompanyModel.find();
      return companies;
    } catch (err) {
      throw err;
    }
  }

  async GetMyCompanies({ userLogin }: { userLogin: string }) {
    try {
      const companies = await CompanyModel.find();
      return companies.filter(
        (company) =>
          company.owner === userLogin || company.admins.includes(userLogin)
      );
    } catch (err) {
      throw err;
    }
  }

  async RateCompany(data: {
    companyId: string;
    identity: string;
    rating: number;
  }) {
    try {
      const { companyId, identity, rating } = data;
      if (!rating || rating > 5 || rating < 1) {
        throw AppError.badRequest("Wrong rating input");
      }
      if (!mongoose.Types.ObjectId.isValid(companyId)) {
        throw AppError.badRequest("Wrong id format!");
      }
      const company = await CompanyModel.findOne({ _id: data.companyId });
      if (!company) {
        throw AppError.badRequest("Wrong company id!");
      }
      if (company.ratings.filter((r) => r.userId === identity).length > 0) {
        throw AppError.badRequest("You have already rated this!");
      }
      const updatedProduct = await CompanyModel.findOneAndUpdate(
        { _id: data.companyId },
        {
          $push: { ratings: { userId: identity, value: rating } },
          avgRating:
            (company.avgRating * company.ratings.length + rating) /
            (company.ratings.length + 1),
        },
        { returnOriginal: false }
      );
      return updatedProduct;
    } catch (err) {
      throw err;
    }
  }

  async DeleteRating(data: { companyId: string; identity: string }) {
    try {
      const { companyId, identity } = data;
      if (!mongoose.Types.ObjectId.isValid(companyId)) {
        throw AppError.badRequest("Wrong id format!");
      }
      let company = await CompanyModel.findOne({ _id: data.companyId });
      if (!company) {
        throw AppError.badRequest("Wrong product id!");
      }
      if (company.ratings.filter((r) => r.userId === identity).length === 0) {
        throw AppError.badRequest("You have not rated yet!");
      }
      company.avgRating =
        (company.avgRating * company.ratings.length -
          company.ratings.find((r) => r.userId === identity).value) /
          (company.ratings.length - 1) || 0;
      company.ratings.splice(
        company.ratings.findIndex((r) => r.userId === identity),
        1
      );
      const updatedProduct = await company.save();
      return updatedProduct;
    } catch (err) {
      throw err;
    }
  }

  async SubscribeEvents(payload: {
    event: string;
    data: { companyId: string };
  }) {
    const { event, data } = payload;
    let result;
    switch (event) {
      case "GET_COMPANY_BY_ID":
        result = await this.GetCompany({ companyId: data.companyId });
        break;
      default:
        break;
    }
    return result;
  }
}
