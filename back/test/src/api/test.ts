import express from "express";
import { TestService } from "../services/TestService";
import { checkAuth } from "../utils/check-auth";

export const testAPI = async (app: express.Application) => {
 const service = new TestService();
 app.post(
  "/create",
  checkAuth,
  async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
  ) => {
   try {
    const {
     purchaseId,
     testStart,
     testEnd,
     reportingFrequency,
     trackingRange,
     identity,
    } = req.body;

    const data = await service.CreateTest({
     purchaseId,
     testStart,
     testEnd,
     reportingFrequency,
     trackingRange,
     identity,
    });
    res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );

 app.delete(
  "/:id",
  checkAuth,
  async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
  ) => {
   try {
    const { identity } = req.body;

    const data = await service.DeleteTest({
     identity,
     testId: req.params.id,
    });
    res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );

 app.put(
  "/:id",
  checkAuth,
  async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
  ) => {
   try {
    const { testStart, testEnd, reportingFrequency, trackingRange, identity } =
     req.body;

    const data = await service.ChangeTest({
     testStart,
     testEnd,
     reportingFrequency,
     trackingRange,
     identity,
     testId: req.params.id,
    });
    res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );
};
