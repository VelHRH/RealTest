import { AuthController } from "../controllers/AuthController";
import express from 'express'

export const authAPI = async (app: express.Application) => {
  const controller = new AuthController();

  app.post('/user/register', controller.RegisterUser);
  app.post('/user/login', controller.LoginUser);
  app.post('/user/logout', controller.LogoutUser);
}