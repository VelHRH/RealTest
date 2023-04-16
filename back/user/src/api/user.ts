import { UserController } from "../controllers/UserController";
import express from 'express'
import { checkAuth } from "../utils/check-auth";

export const userAPI = async (app: express.Application) => {
  const controller = new UserController();

  app.get('/user/profile', checkAuth, controller.GetProfile);
}