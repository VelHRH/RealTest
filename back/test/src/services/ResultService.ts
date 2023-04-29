import { runTestingForDuration } from "../utils/run-test";
import { ResultModel } from "../database/models/Result";

export class ResultService {
 async CreateResult({ testId }: { testId: string }) {
  const intervalId = setInterval(async () => {
   await this.ExecuteTest(testId);
  }, 6000);

  setTimeout(() => {
   clearInterval(intervalId);
  }, 300000);

  return Promise.resolve({ success: true });
 }

 async ExecuteTest(testId: string) {
  const startTime = new Date();
  const result = await runTestingForDuration(5000);
  const newResult = new ResultModel({
   testId: testId,
   resultStart: startTime,
   resultEnd: new Date(),
   data: result,
  });
  await newResult.save();
 }
}
