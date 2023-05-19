import { PurchaseModel } from "../database/models/Purchase";
import { DeviceModel } from "../database/models/Device";
import { CompanyModel } from "../database/models/Company";
import { AppError } from "../utils/app-errors";
import Stripe from "stripe";

const stripe = new Stripe(
 "sk_test_51N7GehIc2aHxSrSdja9QCmJfDWbpQjG5gsJ42IjLwUdIuEs0TTl5BRp4XuqYF654wLPsIrjeOM5A3kepsl7XuFmx00CRf9smQV",
 { apiVersion: "2022-11-15" }
);

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

 async GetDevice(data: { deviceId: string }) {
  try {
   const { deviceId } = data;
   const device = await DeviceModel.findById(deviceId);
   return device;
  } catch (err) {
   throw err;
  }
 }

 async PurchaseDevice(data: {
  companyId: string;
  deviceId: string;
  defaultReportingFrequency: string;
  defaultTrackingRange: number;
  identityLogin: string;
 }) {
  try {
   const {
    companyId,
    deviceId,
    defaultReportingFrequency,
    defaultTrackingRange,
    identityLogin,
   } = data;

   const company = await CompanyModel.findById(companyId);
   if (!company) {
    throw AppError.badRequest("The company doesn't exist!");
   }
   if (
    company.owner !== identityLogin &&
    !company.admins.includes(identityLogin)
   ) {
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
  identityLogin: string;
  purchaseId: string;
 }) {
  try {
   const {
    defaultReportingFrequency,
    defaultTrackingRange,
    identityLogin,
    purchaseId,
   } = data;
   const company = await this.GetCompanyByPurchaseId(purchaseId);
   if (
    company.owner !== identityLogin &&
    !company.admins.includes(identityLogin)
   ) {
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

 async GetPurchase(data: { identityLogin: string; purchaseId: string }) {
  try {
   const { identityLogin, purchaseId } = data;
   const company = await this.GetCompanyByPurchaseId(purchaseId);
   if (
    company.owner !== identityLogin &&
    !company.admins.includes(identityLogin)
   ) {
    throw AppError.badRequest("You don't work in the company!");
   }
   const purchase = await PurchaseModel.findById(purchaseId);
   return purchase;
  } catch (err) {
   throw err;
  }
 }

 async GetPurchasesByCompany(data: { companyId: string }) {
  try {
   const { companyId } = data;
   let returnData = [];
   const purchases = await PurchaseModel.find({ companyId });
   for (let purchase of purchases) {
    const device = await DeviceModel.findById(purchase.deviceId);
    returnData.push({ _id: purchase._id, name: device.name });
   }
   return returnData;
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

 async SwitchPurchaseStatus({ purchaseId }: { purchaseId: string }) {
  try {
   const purchase = await PurchaseModel.findById(purchaseId);
   if (!purchase) {
    throw AppError.badRequest("The device is unavilable!");
   }
   purchase.isFree = !purchase.isFree;
   await purchase.save();
   return { success: true };
  } catch (err) {
   throw err;
  }
 }

 async CreatePaymentSession(data: {
  returnUrl: string;
  amount: number;
  companyId: string;
 }) {
  try {
   const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
     {
      price_data: {
       currency: "usd",
       product_data: {
        name: "Top up balance",
       },
       unit_amount: data.amount * 100,
      },
      quantity: 1,
     },
    ],
    mode: "payment",
    success_url: `${data.returnUrl}/company/${data.companyId}`,
    cancel_url: `${data.returnUrl}/company/${data.companyId}`,
   });
   return { id: session.id };
  } catch (err) {
   throw err;
  }
 }

 async IncreaseBalance(data: { amount: number; companyId: string }) {
  try {
   await CompanyModel.findOneAndUpdate(
    { _id: data.companyId },
    { $inc: { balance: data.amount } }
   );
   return { success: true };
  } catch (err) {
   throw err;
  }
 }

 async SubscribeEvents(payload: {
  event: string;
  data: { identityLogin: string; purchaseId: string };
 }) {
  const { event, data } = payload;
  const { identityLogin, purchaseId } = data;
  let result;
  switch (event) {
   case "GET_PURCHASE_BY_ID":
    result = await this.GetPurchase({ identityLogin, purchaseId });
    break;
   case "GET_COMPANY_BY_PURCHASE":
    result = await this.GetCompanyByPurchaseId(purchaseId);
    break;
   case "SWITCH_PURCHASE_STATUS":
    result = await this.SwitchPurchaseStatus({ purchaseId });
    break;
   default:
    break;
  }
  return result;
 }
}
