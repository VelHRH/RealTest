import { runTestingForDuration } from "../utils/run-test";
import { ResultModel } from "../database/models/Result";
import { TestModel } from "../database/models/Test";
import { AppError } from "../utils/app-errors";

export class ResultService {
 async StartCreatingResults({
  testId,
  testEnd,
 }: {
  testId: string;
  testEnd: string;
 }) {
  try {
   const test = await TestModel.findOne({ _id: testId });
   if (!test) {
    throw AppError.badRequest("This test was not created!");
   }
   if (!testEnd) {
    throw AppError.badRequest(
     "You must set the end time of your test properly!"
    );
   }
   const reportingFrequency =
    test.reportingFrequency === "Every 15 minutes"
     ? 15 * 60 * 1000
     : test.reportingFrequency === "Every 30 minutes"
     ? 30 * 60 * 1000
     : 60 * 60 * 1000;
   const start = new Date();
   const end = new Date(testEnd);
   const timeDifference = end.getTime() - start.getTime();
   if (timeDifference < reportingFrequency + 1000) {
    throw AppError.badRequest(
     "You must set the end time of your test properly!"
    );
   }
   await TestModel.findOneAndUpdate(
    { _id: testId },
    { testStart: start, testEnd: end }
   );
   const intervalId = setInterval(async () => {
    await this.ExecuteTest(testId, reportingFrequency);
   }, reportingFrequency + 1000);

   setTimeout(() => {
    clearInterval(intervalId);
   }, timeDifference);

   return Promise.resolve({ success: true });
  } catch (err) {
   throw err;
  }
 }

 async ExecuteTest(testId: string, reportingFrequency: number) {
  const startTime = new Date();
  const result = await runTestingForDuration(reportingFrequency);
  const newResult = new ResultModel({
   testId: testId,
   resultStart: startTime,
   resultEnd: new Date(),
   data: result,
  });
  await newResult.save();
 }

 async GetResults({ testId }: { testId: string }) {
  try {
   const results = await ResultModel.find({ testId });
   return results;
  } catch (err) {
   throw err;
  }
 }
}
