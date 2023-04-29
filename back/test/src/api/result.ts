import express from "express";
import { ResultService } from "../services/ResultService";
import { checkAuth } from "../utils/check-auth";

export const resultAPI = async (app: express.Application) => {
 const service = new ResultService();
 app.post(
  "/result/create/:id",
  checkAuth,
  async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
  ) => {
   try {
    const data = await service.CreateResult({ testId: req.params.id });
    res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );
};
