import { UserService } from "../services/UserService";
import express from "express";

export const appEvents = async (app: express.Application) => {
  const service = new UserService();

  app.use(
    "/app-events",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { payload } = req.body;
        const result = await service.SubscribeEvents(payload);
        console.log("============= App Event ================");
        return res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    }
  );
};
