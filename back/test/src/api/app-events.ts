import { TestService } from "../services/TestService";
import express from "express";

export const appEvents = async (app: express.Application) => {
 const service = new TestService();

 app.use("/app-events", async (req: express.Request, res: express.Response) => {
  const { payload } = req.body;
  const result = 3; //await service.SubscribeEvents(payload);
  console.log("============= App Event ================");
  return res.status(200).json(result);
 });
};
