import { runTestingForDuration } from "../utils/run-test";
import { ResultModel } from "../database/models/Result";
import { TestModel } from "../database/models/Test";
import { AppError } from "../utils/app-errors";
import axios from "axios";
import { BASE_URL } from "../config";

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
     ? 60 * 1000
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
    { testStart: start, testEnd: end, isExecuted: true }
   );
   const intervalId = setInterval(async () => {
    await this.ExecuteTest(testId, reportingFrequency);
   }, reportingFrequency + 1000);

   setTimeout(async () => {
    const payload = {
     event: "SWITCH_PURCHASE_STATUS",
     data: { purchaseId: test.purchaseId },
    };
    await axios.post(`${BASE_URL}/company/app-events/`, {
     payload,
    });
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

 GetDataOfResult(result: string) {
  const cm = parseInt(result.slice(0, result.indexOf("cm")));
  const time = parseInt(
   result.slice(result.indexOf(" "), result.indexOf("ms"))
  );
  return { cm, time };
 }

 async GetResults({ testId }: { testId: string }) {
  try {
   const results = await ResultModel.find({ testId });
   let reports = [];

   const defaultDistance = parseInt(
    results[0]?.data[0].slice(0, results[0].data[0].indexOf("cm"))
   );
   for (let result of results) {
    let approaches = [];
    for (let i = 0; i < result.data.length - 1; i++) {
     if (defaultDistance - this.GetDataOfResult(result.data[i]).cm >= 5) {
      approaches.push({
       approach: this.GetDataOfResult(result.data[i]).cm,
       duration:
        (this.GetDataOfResult(result.data[i + 1]).time -
         this.GetDataOfResult(result.data[i]).time) /
        1000,
      });
     }
    }
    if (
     defaultDistance -
      this.GetDataOfResult(result.data[result.data.length - 1]).cm >=
     5
    ) {
     approaches.push({
      approach: this.GetDataOfResult(result.data[result.data.length - 1]).cm,
      duration: -1,
     });
    }
    reports.push({
     _id: result._id,
     testId: result.testId,
     approaches,
     resultStart: result.resultStart,
     resultEnd: result.resultEnd,
    });
   }
   return reports;
  } catch (err) {
   throw err;
  }
 }
}
