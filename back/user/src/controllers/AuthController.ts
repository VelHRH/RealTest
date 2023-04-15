// @ts-nocheck
import {APIError, STATUS_CODES, BadRequestError} from '../utils/app-errors'
import { UserModel } from '../database/models/User'
import { random, authentication } from '../utils';

export class AuthController {
  async RegisterUser(email: string, password: string, name: string, login: string) {
    try{
      const existingEmail = await UserModel.findOne({email});
      const existingLogin = await UserModel.findOne({login});
      if (existingEmail || existingLogin){
        throw new BadRequestError();
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
      return userResult;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Customer"
      );
    }
  }
}