import { AppError } from "../utils/app-errors";
import { CompanyModel } from "../database/models/Company";
import mongoose from "mongoose";

export class CompanyService {
 async CreateCompany(data: { name: string; owner: string; avatarUrl: string }) {
  try {
   const { name, owner, avatarUrl } = data;
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
