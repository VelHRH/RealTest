// @ts-nocheck
import { AuthController } from "../controllers/AuthController";
import express from 'express'

export const authAPI = async (app: express.Application) => {
  const controller = new AuthController();

  app.post('/user/register', async (req, res, next) => {
    try {
      const {email, password, name, login} = req.body;
      const data = await controller.RegisterUser(email, password, name, login);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  })
}