import express from "express";
import {merge} from "lodash";
import { UserModel } from "../database/models/User";
import {AppError} from '../utils/app-errors'

export const checkAuth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try{
    const sessionToken = req.rawHeaders.filter(s => s.includes("COOKIE_AUTH="))[0]?.slice(12);
    if (!sessionToken) {
      throw AppError.unauthorised("You are not logged in.");
    }
    const existingUser = await UserModel.findOne({'authentication.sessionToken': sessionToken});

    if (!existingUser) {
      throw AppError.unauthorised("You are not logged in.");
    }

    merge(req.body, {identity: existingUser._id});
    return next();
  } catch (err) {
    next(err);
  }

}