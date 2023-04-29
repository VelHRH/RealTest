import { AuthService } from "../services/AuthService";
import express from "express";
import { checkAuth } from "../utils/check-auth";
import { registerValidation, passwordValidation } from "../utils/validations";
import { validationResult } from "express-validator";
import { AppError } from "../utils/app-errors";

export const authAPI = async (app: express.Application) => {
 const service = new AuthService();

 app.post(
  "/register",
  registerValidation,
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
    const { email, login, password, name } = req.body;
    const data = await service.RegisterUser({ email, login, password, name });
    return res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );

 app.post(
  "/login",
  async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
  ) => {
   try {
    const { email, login, password } = req.body;
    const { data, token } = await service.LoginUser({ email, login, password });
    res.cookie("COOKIE_AUTH", token, { httpOnly: true, maxAge: 3600000 });
    return res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );

 app.post(
  "/logout",
  checkAuth,
  async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
  ) => {
   try {
    await service.LogoutUser(req.cookies.COOKIE_AUTH);
    res.clearCookie("COOKIE_AUTH");
    return res.status(200).json({ success: true }).end();
   } catch (err) {
    next(err);
   }
  }
 );

 app.put(
  "/changePassword",
  passwordValidation,
  checkAuth,
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
    const { oldPassword, newPassword, repeatPassword } = req.body;
    const _id = req.body.identity;
    await service.EditPassword({
     oldPassword,
     newPassword,
     repeatPassword,
     _id,
    });
    return res.status(200).json({ success: true }).end();
   } catch (err) {
    next(err);
   }
  }
 );
};
