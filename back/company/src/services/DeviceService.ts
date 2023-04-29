import { PurchaseModel } from "../database/models/Purchase";
import { DeviceModel } from "../database/models/Device";
import { CompanyModel } from "../database/models/Company";
import { AppError } from "../utils/app-errors";

export class DeviceService {
 async CreateDevice(data: {
  name: string;
  description: string;
  imgUrl: string;
  price: number;
 }) {
  try {
   const { name, description, imgUrl, price } = data;
   if (!name || !description || !imgUrl || !price) {
    throw AppError.badRequest("All fields should be filled!");
   }
   const device = new DeviceModel({ name, description, imgUrl, price });
   const doc = await device.save();
   return doc;
  } catch (err) {
   throw err;
  }
 }

 async PurchaseDevice(data: {
  companyId: string;
  deviceId: string;
  defaultReportingFrequency: string;
  defaultTrackingRange: number;
  identity: string;
 }) {
  try {
   const {
    companyId,
    deviceId,
    defaultReportingFrequency,
    defaultTrackingRange,
    identity,
   } = data;

   const company = await CompanyModel.findById(companyId);
   if (!company) {
    throw AppError.badRequest("The company doesn't exist!");
   }
   if (company.owner !== identity && !company.admins.includes(identity)) {
    throw AppError.badRequest("You don't work in the company!");
   }

   const device = await DeviceModel.findById(deviceId);
   if (!device) {
    throw AppError.badRequest("The device is unavilable!");
   }
   const newBallance = company.balance - device.price;
   if (newBallance < 0) {
    throw AppError.badRequest("Your doesn't have enogh money on balance!");
   }
   const purchase = new PurchaseModel({
    companyId,
    deviceId,
    defaultReportingFrequency,
    defaultTrackingRange,
    delivered: false,
   });
   const doc = await purchase.save();

   await CompanyModel.findOneAndUpdate(
    { _id: companyId },
    { balance: newBallance }
   );
   return doc;
  } catch (err) {
   throw err;
  }
 }

 async ChangeDefaults(data: {
  defaultReportingFrequency: string;
  defaultTrackingRange: number;
  identity: string;
  purchaseId: string;
 }) {
  try {
   const {
    defaultReportingFrequency,
    defaultTrackingRange,
    identity,
    purchaseId,
   } = data;
   const company = await this.GetCompanyByPurchaseId(purchaseId);
   if (company.owner !== identity && !company.admins.includes(identity)) {
    throw AppError.badRequest("You don't work in the company!");
   }
   await PurchaseModel.findOneAndUpdate(
    { _id: purchaseId },
    { defaultReportingFrequency, defaultTrackingRange }
   );
   return { success: true };
  } catch (err) {
   throw err;
  }
 }

 async GetPurchase(data: { identity: string; purchaseId: string }) {
  try {
   const { identity, purchaseId } = data;
   const company = await this.GetCompanyByPurchaseId(purchaseId);
   if (company.owner !== identity && !company.admins.includes(identity)) {
    throw AppError.badRequest("You don't work in the company!");
   }
   const purchase = await PurchaseModel.findById(purchaseId);
   return purchase;
  } catch (err) {
   throw err;
  }
 }

 async GetCompanyByPurchaseId(purchaseId: string) {
  try {
   const purchase = await PurchaseModel.findById(purchaseId);
   if (!purchase) {
    throw AppError.badRequest("The device is unavilable!");
   }
   const company = await CompanyModel.findById(purchase.companyId);
   return company;
  } catch (err) {
   throw err;
  }
 }

 async SubscribeEvents(payload: {
  event: string;
  data: { identity: string; purchaseId: string };
 }) {
  const { event, data } = payload;
  const { identity, purchaseId } = data;
  let result;
  switch (event) {
   case "GET_PURCHASE_BY_ID":
    result = await this.GetPurchase({ identity, purchaseId });
    break;
   case "GET_COMPANY_BY_PURCHASE":
    result = await this.GetCompanyByPurchaseId(purchaseId);
    break;
   default:
    break;
  }
  return result;
 }
}
