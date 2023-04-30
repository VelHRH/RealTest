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
  checkAuth,
  async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
  ) => {
   try {
    const data = await service.GetResults({
     testId: req.params.id,
    });
    res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );
};
