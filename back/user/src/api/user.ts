// @ts-nocheck
import { UserController } from "../controllers/UserController";
import express from 'express'

export const userAPI = async (app: express.Application) => {
  const controller = new UserController();

  app.get('/user/profile', async (req, res, next) => {
    try{
      const {data} = await controller.GetProfile(req.id);
      return res.json(data);
    } catch (err){
      next(err);
    }
  })
}