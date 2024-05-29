import express from "express";
import { ResultService } from "../services/ResultService";
import { checkAuth } from "../utils/check-auth";

export const resultAPI = async (app: express.Application) => {
  const service = new ResultService();
  app.post(
    "/:id/result",
    checkAuth,
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const data = await service.StartCreatingResults({
          testId: req.params.id,
          testEnd: req.body.testEnd,
        });
        res.status(200).json(data);
      } catch (err) {
        next(err);
      }
    }
  );

  app.get(
    "/:id/result",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const data = await service.GetFilteredResults(req.params.id);
        res.status(200).json(data);
      } catch (err) {
        next(err);
      }
    }
  );

  app.get(
    "/:id/binomial",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { peopleNumber } = req.query;
        const numberOfPeople = peopleNumber
          ? parseFloat(peopleNumber as string)
          : undefined;
        const data = await service.BinomialDistribution(
          req.params.id,
          numberOfPeople
        );
        res.status(200).json(data);
      } catch (err) {
        next(err);
      }
    }
  );

  app.get(
    "/:id/poisson",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { start, end } = req.query;
        const data = await service.PoissonDistribution(
          req.params.id,
          start!.toString(),
          end!.toString()
        );
        res.status(200).json(data);
      } catch (err) {
        next(err);
      }
    }
  );

  app.get(
    "/:id/anova",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const data = await service.PerformAnova(req.params.id);
        res.status(200).json(data);
      } catch (err) {
        next(err);
      }
    }
  );
};
