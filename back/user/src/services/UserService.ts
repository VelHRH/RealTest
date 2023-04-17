import {AppError} from '../utils/app-errors'
import { UserModel } from '../database/models/User'

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

  async SubscribeEvents(payload: {event: string, data: {id: string}}){
    const { event, data} =  payload;
    
    switch(event){
        case 'ADD_TO_WISHLIST':
        case 'GET_PROFILE':
            this.GetProfile(data.id);
            break;
        case 'TESTING':
            console.log("testing...");
            break;
        default:
            break;
    }

  }
}