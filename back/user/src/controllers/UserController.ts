import {AppError} from '../utils/app-errors'
import { UserModel } from '../database/models/User'
import express from 'express'

export class UserController {
  async GetProfile(req: express.Request, res: express.Response, next: express.NextFunction) {
    try{
      const existingUser = await UserModel.findById(req.body.id);
      if (!existingUser){
        throw AppError.badRequest("User doesn't exist");
      }
      return res.status(200).json(existingUser);
    } catch (err) {
      next(err);
    }
  }
}