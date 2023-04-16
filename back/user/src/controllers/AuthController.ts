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

  async LoginUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try{
      const {email, login, password} = req.body;
      if ((!email && !login) || !password){
        throw AppError.badRequest("Wrong login, email or password");
      }
      const user = email ? 
        await UserModel.findOne({email}).select('+authentication.salt +authentication.password') : 
        await UserModel.findOne({login}).select('+authentication.salt +authentication.password');
      const expectedHash = authentication(user.authentication.salt, password);

      if (user.authentication.password !== expectedHash){
        throw AppError.badRequest("Wrong login, email or password");
      }

      const salt = random();
      user.authentication.sessionToken = authentication(salt, user._id.toString());
      await user.save();

      res.cookie('COOKIE_AUTH', user.authentication.sessionToken, {domain: 'localhost', path: '/'});

      return res.status(200).json(user).end();
    } catch (err) {
      next(err);
    }
  }

  async LogoutUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try{
      res.clearCookie('COOKIE_AUTH');
      return res.status(200).json({message: "success"}).end();
    } catch (err) {
      next(err);
    }
  }
}