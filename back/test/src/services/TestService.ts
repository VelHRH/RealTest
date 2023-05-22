import { TestModel } from "../database/models/Test";
import { AppError } from "../utils/app-errors";
import axios from "axios";
import { BASE_URL } from "../config";
import mongoose from "mongoose";

export class TestService {
 async CreateTest(data: {
  purchaseId: string;
  name: string;
  productId: string;
  reportingFrequency: string;
  identityLogin: string;
 }) {
  try {
   const { purchaseId, name, productId, reportingFrequency, identityLogin } =
    data;

   if (!purchaseId || !productId || !name || !reportingFrequency) {
    throw AppError.badRequest("All fields should be filled!");
   }
   const existingTest = await TestModel.find({
    productId,
    purchaseId,
    isExecuted: false,
   });
   if (existingTest.length !== 0) {
    throw AppError.badRequest(
     "You already have a test for the product with the device"
    );
   }
   await this.CheckCompanyByPurchase(purchaseId, identityLogin);
   const test = new TestModel({
    purchaseId,
    name,
    productId,
    reportingFrequency,
    testCreator: identityLogin,
   });
   const doc = await test.save();
   const payload = {
    event: "SWITCH_PURCHASE_STATUS",
    data: { purchaseId },
   };
   await axios.post(`${BASE_URL}/company/app-events/`, {
    payload,
   });
   return doc;
  } catch (err) {
   throw err;
  }
 }

 async DeleteTest(data: { testId: string; identityLogin: string }) {
  try {
   const { testId, identityLogin } = data;
   if (!mongoose.Types.ObjectId.isValid(testId)) {
    throw AppError.badRequest("Wrong id format!");
   }
   const test = await TestModel.findById(testId);
   await this.CheckCompanyByPurchase(test.purchaseId, identityLogin);
   await TestModel.findByIdAndDelete(testId);
   const payload = {
    event: "SWITCH_PURCHASE_STATUS",
    data: { purchaseId: test.purchaseId },
   };
   await axios.post(`${BASE_URL}/company/app-events/`, {
    payload,
   });
   return { success: true };
  } catch (err) {
   throw err;
  }
 }

 async GetTestById(data: { testId: string }) {
  try {
   const { testId } = data;
   if (!mongoose.Types.ObjectId.isValid(testId)) {
    throw AppError.badRequest("Wrong id format!");
   }
   const test = await TestModel.findById(testId);
   if (!test) {
    throw AppError.badRequest("No tests found!");
   }
   return test;
  } catch (err) {
   throw err;
  }
 }

 async GetAllTests() {
  try {
   const test = await TestModel.find();
   if (!test) {
    throw AppError.badRequest("No tests found!");
   }
   return test;
  } catch (err) {
   throw err;
  }
 }

 async GetTestByProductId(data: { productId: string }) {
  try {
   const { productId } = data;
   if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw AppError.badRequest("Wrong id format!");
   }
   const tests = await TestModel.find({ productId });
   return tests;
  } catch (err) {
   throw err;
  }
 }

 async ChangeTest(data: {
  testId: string;
  reportingFrequency: string;
  trackingRange: number;
  identity: string;
 }) {
  try {
   const { testId, identity, reportingFrequency, trackingRange } = data;
   const test = await TestModel.findById(testId);
   if (!test) {
    throw AppError.unauthorised(
     "The test you are trying to edit does nor exist anymore!"
    );
   }
   await this.CheckCompanyByPurchase(test.purchaseId, identity);
   await TestModel.findOneAndUpdate(
    { _id: testId },
    { reportingFrequency, trackingRange }
   );
   return { success: true };
  } catch (err) {
   throw err;
  }
 }

 async CheckCompanyByPurchase(purchaseId: string, identityLogin: string) {
  try {
   const payload = {
    event: "GET_COMPANY_BY_PURCHASE",
    data: { purchaseId },
   };
   const company = (await axios.post(`${BASE_URL}/company/app-events/`, {
    payload,
   })) as { data: { owner: string; admins: string[] } };

   if (!company.data) {
    throw AppError.badRequest("You don't have the device in your company!");
   }
   if (
    !company.data.admins.includes(identityLogin) &&
    company.data.owner !== identityLogin
   ) {
    throw AppError.badRequest("You've got no rights to moderate this company!");
   }
   return true;
  } catch (err) {
   if (err.response && err.response.status === 500) {
    throw AppError.internal(
     "The foreign service is unavailable at this time. Please try again later."
    );
   }
   throw err;
  }
 }
}
