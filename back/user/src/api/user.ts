// @ts-nocheck
import { UserController } from "../controllers/UserController";
import express from 'express'

export const userAPI = async (app: express.Application) => {
  const controller = new UserController();

  app.get('/user/profile', controller.GetProfile)
}