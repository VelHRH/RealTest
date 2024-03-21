import axios from "axios";
import * as ss from "simple-statistics";
import type {
  AnovaResult,
  Approach,
  BinomialResult,
  PoissonResult,
  Result,
} from "types-realtest";
import { BASE_URL } from "../config";
import { ResultModel } from "../database/models/Result";
import { TestModel } from "../database/models/Test";
import { AppError } from "../utils/app-errors";
import { runTestingForDuration } from "../utils/run-test";

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
          : 60 * 1000;
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

      this.switchPurchaseStatus(test.purchaseId);

      await this.ExecuteTest(testId, reportingFrequency);

      setTimeout(async () => {
        this.switchPurchaseStatus(test.purchaseId);
        clearInterval(intervalId);
      }, timeDifference);

      return { success: true };
    } catch (err) {
      throw err;
    }
  }

  private async switchPurchaseStatus(id: string) {
    const payload = {
      event: "SWITCH_PURCHASE_STATUS",
      data: { purchaseId: id },
    };
    await axios.post(`${BASE_URL}/company/app-events/`, {
      payload,
    });
  }

  async ExecuteTest(testId: string, reportingFrequency: number) {
    const startTime = new Date();
    const results = await runTestingForDuration(reportingFrequency);
    const newResult: Result = {
      testId: testId,
      start: startTime,
      end: new Date(),
      approaches: results,
    };
    await new ResultModel(newResult).save();
  }

  async GetAllResults(testId: string) {
    try {
      let results: Result[] = await ResultModel.find({ testId });
      let allClients = 0;
      if (!results.length) return { results, allClients };
      const defaultDistance = results[0].approaches[0].distance;
      let curApproachDistance = 0;
      let curApprocahTime = 0;
      for (let index in results) {
        let apps: Approach[] = [];
        const { approaches } = results[index];
        for (let i = 1; i < approaches.length; i++) {
          if (this.isApproach(approaches[i].distance, defaultDistance)) {
            if (this.isApproach(approaches[i - 1].distance, defaultDistance)) {
              curApproachDistance = Math.min(
                curApproachDistance,
                approaches[i].distance
              );
              curApprocahTime += this.countTimeDifference(
                approaches[i - 1].time,
                approaches[i].time
              );
            } else {
              curApproachDistance = approaches[i].distance;
            }
          } else {
            if (curApproachDistance === 0) continue;
            apps.push({
              distance: curApproachDistance,
              time:
                curApprocahTime +
                this.countTimeDifference(
                  approaches[i - 1].time,
                  approaches[i].time
                ),
            });
            curApproachDistance = 0;
            curApprocahTime = 0;
          }
        }
        results[index].approaches = [...apps];
        allClients += apps.length;
      }
      return { results, allClients };
    } catch (err) {
      throw err;
    }
  }

  async GetFilteredResults(testId: string) {
    try {
      const { results, allClients } = await this.GetAllResults(testId);
      let allApproaches = 0;
      return {
        filteredResults: results.map((result) => {
          const filtered = result.approaches.filter(
            (approach) => approach.time >= 2
          );
          allApproaches += filtered.length;
          result.approaches = filtered;
          return result;
        }),
        allApproaches,
        allClients,
      };
    } catch (err) {
      throw err;
    }
  }

  async BinomialDistribution(
    testId: string,
    peopleNumber: number = 100
  ): Promise<BinomialResult> {
    const { allClients, allApproaches } = await this.GetFilteredResults(testId);
    const p = allApproaches / allClients;
    const distributionArray = [];
    for (let i = 0; i <= peopleNumber; i++) {
      const calculatedProbability =
        this.combinations(peopleNumber, i) *
        Math.pow(p, i) *
        Math.pow(1 - p, peopleNumber - i);
      const probability = parseFloat((calculatedProbability * 100).toFixed(2));
      if (probability > 0) {
        distributionArray.push({
          people: i,
          probability,
        });
      }
    }

    return distributionArray;
  }

  async PoissonDistribution(
    testId: string,
    start: string,
    end: string
  ): Promise<PoissonResult> {
    const lambda = await this.poissonLambdaCount(testId, start, end);
    let probabilities = [];
    let k = 0;
    while (true) {
      const probability = parseFloat(
        ((Math.pow(lambda, k) * Math.exp(-lambda)) / this.factorial(k)).toFixed(
          2
        )
      );
      if (k > lambda && probability === 0) {
        break;
      }
      probabilities.push(probability);
      k++;
    }
    const probabilitySums: number[] = probabilities
      .reverse()
      .reduce((acc: number[], cur: number) => {
        const lastSum = acc.length > 0 ? acc[acc.length - 1] : 0;
        acc.push(lastSum + cur);
        return acc;
      }, []);
    probabilitySums[probabilitySums.length - 1] = 1;
    return probabilitySums
      .reverse()
      .slice(1)
      .map((prob, i) => ({
        people: i + 1,
        probability: Math.round(prob * 100),
      }));
  }

  async PerformAnova(testId: string): Promise<AnovaResult> {
    const test1 = (await TestModel.findById(testId))!;
    const test2 = (await TestModel.findById(test1.pairTest!))!;
    const tests = [test1, test2];
    let testsAnovaData: AnovaResult["testsAnovaData"] = [];
    for (const index in tests.map((test) => test.id)) {
      const { filteredResults } = await this.GetFilteredResults(
        tests[index].id
      );
      filteredResults.forEach((result) => {
        testsAnovaData[index] = {
          testsApproaches: [
            ...(testsAnovaData[index]?.testsApproaches || []),
            ...result.approaches,
          ],
          name: tests[index].name,
          id: tests[index].id,
        };
      });
    }

    const pValue = ss.tTestTwoSample(
      testsAnovaData[0].testsApproaches.map((app) => app.time),
      testsAnovaData[1].testsApproaches.map((app) => app.time)
    )!;
    let anovaResult;

    if (pValue < 0.05) {
      anovaResult = "There is a significant difference between approach times";
    } else {
      anovaResult = "No significant difference between approach times";
    }
    return { testsAnovaData, anovaResult };
  }

  private async poissonLambdaCount(testId: string, start: string, end: string) {
    const startDate = this.formatTimeToMils(start);
    const endDate = this.formatTimeToMils(end);
    const { filteredResults } = await this.GetFilteredResults(testId);
    let filteredApproaches = 0;
    filteredResults.forEach((result) => {
      if (result.start >= startDate && result.end <= endDate) {
        filteredApproaches += result.approaches.length;
      }
    });

    return filteredApproaches;
  }

  private formatTimeToMils(time: string) {
    if (time.includes(".")) {
      return new Date(time);
    } else {
      return new Date(time + ":00.000Z");
    }
  }

  private factorial(x: number): number {
    if (x === 0 || x === 1) return 1;
    return x * this.factorial(x - 1);
  }
  private combinations(n: number, k: number): number {
    return this.factorial(n) / (this.factorial(k) * this.factorial(n - k));
  }

  private isApproach(curDistance: number, defaultDistance: number) {
    return defaultDistance - curDistance >= 5;
  }

  private countTimeDifference(prevTime: number, newTime: number) {
    return parseFloat(((newTime - prevTime) / 1000).toFixed(1));
  }
}
