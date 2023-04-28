import express from "express";
import { DeviceService } from "../services/DeviceService";

export const appEvents = async (app: express.Application) => {
 const service = new DeviceService();

 app.use("/app-events", async (req: express.Request, res: express.Response) => {
  const { payload } = req.body;
  const result = await service.SubscribeEvents(payload);
  console.log("============= App Event ================");
  return res.status(200).json(result);
 });
};
