import express from "express";
import { merge } from "lodash";
import { AppError } from "../utils/app-errors";
import axios from "axios";
import { BASE_URL } from "../config";

export const checkAuth = async (
 req: express.Request,
 res: express.Response,
 next: express.NextFunction
) => {
 try {
  const sessionToken = req.cookies.COOKIE_AUTH;
  console.log("COOKIE_AUTH" + sessionToken);
  if (!sessionToken) {
   throw AppError.unauthorised("You are not logged in.");
  }
  const payload = {
   event: "GET_PROFILE_BY_TOKEN",
   data: {
    token: sessionToken,
   },
  };

  const existingUser = await axios.post(`${BASE_URL}/user/app-events/`, {
   payload,
  });

  if (!existingUser.data) {
   throw AppError.unauthorised("You are not logged in.");
  }

  merge(req.body, { identity: existingUser.data._id });
  return next();
 } catch (err) {
  next(err);
 }
};
