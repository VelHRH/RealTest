import { UserService } from "../services/UserService";
import express from "express";

export const userAPI = async (app: express.Application) => {
 const service = new UserService();

 app.get(
  "/getOne/:id",
  async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
  ) => {
   try {
    const id = req.params.id;
    const data = await service.GetProfileByID(id);
    return res.status(200).json(data);
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
    const data = await service.GetAllProfiles();
    return res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );
};
