import { DeviceService } from "../services/DeviceService";
import express from "express";
import { checkAuth } from "../utils/check-auth";
import { deviceValidation } from "../utils/validations";
import { validationResult } from "express-validator";
import { AppError } from "../utils/app-errors";

export const deviceAPI = async (app: express.Application) => {
 const device = new DeviceService();

 app.post(
  "/device/create",
  deviceValidation,
  async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
  ) => {
   try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
     throw AppError.badRequest(validationErrors.array()[0].msg);
    }
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

 app.put(
  "/purchase/:id",
  checkAuth,
  async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
  ) => {
   try {
    const { reportingFrequency, defaultTrackingRange, identity } = req.body;

    const data = await device.ChangeDefaults({
     reportingFrequency,
     defaultTrackingRange,
     identity,
     purchaseId: req.params.id,
    });
    res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );

 app.get(
  "/purchase/:id",
  checkAuth,
  async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
  ) => {
   try {
    const { identity } = req.body;

    const data = await device.GetPurchase({
     identity,
     purchaseId: req.params.id,
    });
    res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );
};
