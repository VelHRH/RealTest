import { runTestingForDuration } from '../utils/run-test';
import { ResultModel } from '../database/models/Result';
import { TestModel } from '../database/models/Test';
import { AppError } from '../utils/app-errors';
import axios from 'axios';
import { BASE_URL } from '../config';
import type { Approach, Result } from 'types';

export class ResultService {
  async StartCreatingResults({ testId, testEnd }: { testId: string; testEnd: string }) {
    try {
      const test = await TestModel.findOne({ _id: testId });
      if (!test) {
        throw AppError.badRequest('This test was not created!');
      }
      if (!testEnd) {
        throw AppError.badRequest('You must set the end time of your test properly!');
      }
      const reportingFrequency =
        test.reportingFrequency === 'Every 15 minutes'
          ? 15 * 60 * 1000
          : test.reportingFrequency === 'Every 30 minutes'
          ? 30 * 60 * 1000
          : 60 * 1000;
      const start = new Date();
      const end = new Date(testEnd);
      const timeDifference = end.getTime() - start.getTime();
      if (timeDifference < reportingFrequency + 1000) {
        throw AppError.badRequest('You must set the end time of your test properly!');
      }
      await TestModel.findOneAndUpdate(
        { _id: testId },
        { testStart: start, testEnd: end, isExecuted: true },
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
      event: 'SWITCH_PURCHASE_STATUS',
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

  async GetResults({ testId }: { testId: string }) {
    try {
      let results: Result[] = await ResultModel.find({ testId });
      let allApproaches = 0;
      if (!results.length) return { results, allApproaches };
      const defaultDistance = results[0].approaches[0].distance;
      for (let index in results) {
        let apps: Approach[] = [];
        const { approaches } = results[index];
        for (let i = 0; i < approaches.length - 1; i++) {
          if (defaultDistance - approaches[i].distance >= 5) {
            apps.push({
              distance: approaches[i].distance,
              time: (approaches[i + 1].time - approaches[i].time) / 1000,
            });
          }
        }
        results[index].approaches = [...apps];
        allApproaches += apps.length;
      }
      return { results, allApproaches };
    } catch (err) {
      throw err;
    }
  }
}
