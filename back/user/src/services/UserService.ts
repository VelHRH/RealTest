import {AppError} from '../utils/app-errors'
import { UserModel } from '../database/models/User'
import express from 'express'

export class UserService {
  async GetProfile(id: string) {
    try{
      const existingUser = await UserModel.findById(id);
      if (!existingUser){
        throw AppError.badRequest("User doesn't exist");
      }
      return existingUser;
    } catch (err) {
      throw err;
    }
  }

  async SubscribeEvents(req: express.Request, res: express.Response, next: express.NextFunction){
    console.log(req.body);
    const { event } =  req.body;
    console.log("============= Other Service Event ================");

    switch(event){
        case 'ADD_TO_WISHLIST':
        case 'GET_PROFILE':
            this.GetProfile("122");
            break;
        case 'TESTING':
            console.log("testing...");
            break;
        default:
            break;
    }

  }
}