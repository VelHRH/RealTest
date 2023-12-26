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
    const { purchaseId, productId, name, reportingFrequency, identityLogin } =
     req.body;

    const data = await service.CreateTest({
     purchaseId,
     name,
     productId,
     reportingFrequency,
     identityLogin,
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
    const { identityLogin } = req.body;

    const data = await service.DeleteTest({
     identityLogin,
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
    const { reportingFrequency, trackingRange, identity } = req.body;

    const data = await service.ChangeTest({
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

 app.get(
  "/:id",
  checkAuth,
  async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
  ) => {
   try {
    const data = await service.GetTestById({
     testId: req.params.id,
    });
    res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );

 app.get(
  "/",
  async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
  ) => {
   try {
    const data = await service.GetAllTests();
    res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );

 app.get(
  "/getByProduct/:id",
  checkAuth,
  async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
  ) => {
   try {
    const data = await service.GetTestByProductId({
     productId: req.params.id,
    });
    res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );
};
