import { DeviceService } from "../services/DeviceService";
import express from "express";
import { checkAuth } from "../utils/check-auth";

export const deviceAPI = async (app: express.Application) => {
 const device = new DeviceService();

 app.post(
  "/device/create",
  async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
  ) => {
   try {
    const { name, description, imgUrl, price } = req.body;

    const data = await device.CreateDevice({
     name,
     description,
     imgUrl,
     price,
    });
    res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );

 app.post(
  "/purchase/create",
  checkAuth,
  async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
  ) => {
   try {
    const {
     companyId,
     deviceId,
     reportingFrequency,
     defaultTrackingRange,
     identity,
    } = req.body;

    const data = await device.PurchaseDevice({
     companyId,
     deviceId,
     reportingFrequency,
     defaultTrackingRange,
     identity,
    });
    res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );
};
