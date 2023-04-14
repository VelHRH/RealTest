import {APIError} from '../utils/errors'
import { UserModel } from '../database/models/User'

export class UserController {
  async GetProfile(id: string) {
    try{
      const existingUser = UserModel.findById(id);
      return existingUser;
    } catch (err) {
      throw new APIError('Data Not found', err)
    }
  }
}