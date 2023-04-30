import { TestModel } from "../database/models/Test";
import { AppError } from "../utils/app-errors";
import axios from "axios";
import { BASE_URL } from "../config";

export class TestService {
 async CreateTest(data: {
  purchaseId: string;
  name: string;
  testStart: string;
  testEnd: string;
  reportingFrequency: string;
  trackingRange: number;
  identity: string;
 }) {
  try {
   const {
    purchaseId,
    testStart,
    name,
    testEnd,
    reportingFrequency,
    trackingRange,
    identity,
   } = data;

   if (
    !purchaseId ||
    !testStart ||
    !testEnd ||
    !name ||
    !reportingFrequency ||
    !trackingRange
   ) {
    throw AppError.badRequest("All fields should be filled!");
   }
   await this.CheckCompanyByPurchase(purchaseId, identity);
   const test = new TestModel({
    purchaseId,
    name,
    testStart,
    testEnd,
    reportingFrequency,
    trackingRange,
    testCreator: identity,
   });
   const doc = await test.save();
   return doc;
  } catch (err) {
   throw err;
  }
 }

 async DeleteTest(data: { testId: string; identity: string }) {
  try {
   const { testId, identity } = data;
   const test = await TestModel.findById(testId);
   await this.CheckCompanyByPurchase(test.purchaseId, identity);
   await TestModel.findByIdAndDelete(testId);
   return { success: true };
  } catch (err) {
   throw err;
  }
 }

 async ChangeTest(data: {
  testId: string;
  testStart: string;
  testEnd: string;
  reportingFrequency: string;
  trackingRange: number;
  identity: string;
 }) {
  try {
   const {
    testId,
    identity,
    testStart,
    testEnd,
    reportingFrequency,
    trackingRange,
   } = data;
   const curDate = new Date();
   const startDate = new Date(testStart);
   if (curDate > startDate) {
    throw AppError.badRequest("You can not change test after it started!");
   }
   const test = await TestModel.findById(testId);
   if (!test) {
    throw AppError.unauthorised(
     "The test you are trying to edit does nor exist anymore!"
    );
   }
   await this.CheckCompanyByPurchase(test.purchaseId, identity);
   await TestModel.findOneAndUpdate(
    { _id: testId },
    { testStart, testEnd, reportingFrequency, trackingRange }
   );
   return { success: true };
  } catch (err) {
   throw err;
  }
 }

 async CheckCompanyByPurchase(purchaseId: string, identity: string) {
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
    !company.data.admins.includes(identity) &&
    company.data.owner !== identity
   ) {
    throw AppError.badRequest("You've got no rights to delete this test!");
   }
   return true;
  } catch (err) {
   throw err;
  }
 }
}
