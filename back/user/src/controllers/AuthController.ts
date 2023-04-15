import { UserModel } from '../database/models/User'
import { random, authentication } from '../utils';
import express from 'express'
import {AppError} from '../utils/app-errors'

export class AuthController {
  async RegisterUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try{
      const {email, login, password, name} = req.body;
      const existingEmail = await UserModel.findOne({email});
      const existingLogin = await UserModel.findOne({login});
      if (existingEmail || existingLogin){
        throw AppError.badRequest("User with this email/login alredy registered");
      }
      const salt = random();

      const user = new UserModel({
        email,
        login,
        name,
        authentication:{
          salt,
          password: authentication(salt, password)
        }
      });
      const userResult = await user.save();
      return res.status(200).json(userResult);
    } catch (err) {
      next(err);
    }
  }
}