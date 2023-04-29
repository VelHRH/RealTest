import { AppError } from "../utils/app-errors";
import axios from "axios";
import { BASE_URL } from "../config";
import { runTestingForDuration } from "../utils/run-test";
import { ResultModel } from "../database/models/Result";

export class ResultService {
 async CreateResult() {
  const result = await runTestingForDuration(50000);
  const newResult = new ResultModel({
   testId: "a",
   resultStart: "2022-12-12",
   resultEnd: "2022-12-12",
   data: result,
  });
  const doc = await newResult.save();
  return doc;
 }
}
