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
  reportingFrequency: string;
  defaultTrackingRange: number;
  identity: string;
 }) {
  try {
   const {
    companyId,
    deviceId,
    reportingFrequency,
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
    reportingFrequency,
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
}
