import express from "express";
import { TestService } from "../services/TestService";
import { checkAuth } from "../utils/check-auth";
import axios from "axios";
import { BASE_URL } from "../config";
import { AppError } from "../utils/app-errors";

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

    const payload = {
     event: "GET_COMPANY_BY_PURCHASE",
     data: { purchaseId },
    };
    const company = (await axios.post(`${BASE_URL}/company/app-events/`, {
     payload,
    })) as { data: { owner: string; admins: string[] } };

    if (!company.data) {
     throw AppError.badRequest("You don't have the device in your company!");
    }

    const data = await service.CreateTest({
     company: company.data,
     purchaseId,
     testStart,
     testEnd,
     reportingFrequency,
     trackingRange,
     testCreator: identity,
    });
    res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );
};
