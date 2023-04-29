import { runTestingForDuration } from "../utils/run-test";
import { ResultModel } from "../database/models/Result";

export class ResultService {
 async CreateResult({ testId }: { testId: string }) {
  return new Promise((resolve, reject) => {
   // Вызов функции в начале, чтобы результат был сохранен сразу
   this.ExecuteTest(testId);

   // Запуск интервала с периодом 5 секунд
   const intervalId = setInterval(async () => {
    await this.ExecuteTest(testId);
   }, 5000);

   // Остановка интервала через 5 минут
   setTimeout(() => {
    clearInterval(intervalId);
    resolve({ success: true });
   }, 300000);
  });
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
