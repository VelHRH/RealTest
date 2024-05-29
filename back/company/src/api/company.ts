import { CompanyService } from "../services/CompanyService";
import express from "express";
import { checkAuth } from "../utils/check-auth";
import axios from "axios";
import { companyValidation } from "../utils/validations";
import { validationResult } from "express-validator";
import { AppError } from "../utils/app-errors";
import { BASE_URL } from "../config";

export const companyAPI = async (app: express.Application) => {
  const service = new CompanyService();

  app.post(
    "/create",
    checkAuth,
    companyValidation,
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
        const { name, avatarUrl, identity, description, identityLogin } =
          req.body;
        const data = await service.CreateCompany({
          name,
          avatarUrl,
          description,
          owner: identityLogin,
        });
        const payload = {
          event: "CHANGE_ROLE",
          data: { newRole: "Owner", _id: identity },
        };
        await axios.post(`${BASE_URL}/user/app-events/`, { payload });
        res.status(200).json(data);
      } catch (err) {
        next(err);
      }
    }
  );

  app.get(
    "/:id",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const data = await service.GetCompany({
          companyId: req.params.id,
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
        const { identity, identityLogin } = req.body;
        const payload = {
          event: "CHANGE_ROLE",
          data: { newRole: "User", _id: identity },
        };
        await axios.post(`${BASE_URL}/user/app-events/`, { payload });
        const data = await service.DeleteCompany({
          _id: req.params.id,
          owner: identityLogin,
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
        const data = await service.GetAllCompanies();
        res.status(200).json(data);
      } catch (err) {
        next(err);
      }
    }
  );

  app.get(
    "/my/getAll",
    checkAuth,
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const data = await service.GetMyCompanies({
          userLogin: req.body.identityLogin,
        });
        res.status(200).json(data);
      } catch (err) {
        next(err);
      }
    }
  );

  app.post(
    "/rate/:id",
    checkAuth,
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { identity, rating } = req.body;
        const data = await service.RateCompany({
          companyId: req.params.id,
          identity,
          rating,
        });
        res.status(200).json(data);
      } catch (err) {
        next(err);
      }
    }
  );

  app.delete(
    "/rate/:id",
    checkAuth,
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { identity } = req.body;
        const data = await service.DeleteRating({
          companyId: req.params.id,
          identity,
        });
        res.status(200).json(data);
      } catch (err) {
        next(err);
      }
    }
  );
};
