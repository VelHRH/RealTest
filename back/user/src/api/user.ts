import { UserService } from "../services/UserService";
import express from 'express'
import { checkAuth } from "../utils/check-auth";

export const userAPI = async (app: express.Application) => {
  const service = new UserService();

  app.get('/profile', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
      const id = req.body.id;
      const data = await service.GetProfile(id);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });
}