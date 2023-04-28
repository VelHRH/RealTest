import { TestModel } from "../database/models/Test";
import { AppError } from "../utils/app-errors";

export class TestService {
 async CreateTest(data: {
  company: { owner: string; admins: string[] };
  purchaseId: string;
  testStart: string;
  testEnd: string;
  reportingFrequency: string;
  trackingRange: number;
  testCreator: string;
 }) {
  try {
   const {
    company,
    purchaseId,
    testStart,
    testEnd,
    reportingFrequency,
    trackingRange,
    testCreator,
   } = data;
   if (!testCreator) {
    throw AppError.unauthorised("Ypu are not logged in!");
   }
   if (
    !purchaseId ||
    !testStart ||
    !testEnd ||
    !reportingFrequency ||
    !trackingRange
   ) {
    throw AppError.badRequest("All fields should be filled!");
   }
   if (!company.admins.includes(testCreator) && company.owner !== testCreator) {
    throw AppError.badRequest("You've got no rights to create this test!");
   }
   const test = new TestModel({
    purchaseId,
    testStart,
    testEnd,
    reportingFrequency,
    trackingRange,
    testCreator,
   });
   const doc = await test.save();
   return doc;
  } catch (err) {
   throw err;
  }
 }
}
