import { UserModel } from '../database/models/Company'
import { random, authentication } from '../utils';
import {AppError} from '../utils/app-errors'

export class AuthService {
  async RegisterUser(data: {email: string, login: string, password: string, name: string}) {
    try{
      const {email, password, login, name} = data;
      if (!email || !password || !name || !login){
        throw AppError.badRequest("All fields should be filled");
      }
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
      return ({email: user.email, login: user.login, _id: user._id, role: user.role});
    } catch (err) {
      throw err;
    }
  }

  async LoginUser(data: {email: string, login: string, password: string}) {
    try{
      const {email, login, password} = data;
      if ((!email && !login) || !password){
        throw AppError.badRequest("Wrong login, email or password");
      }
      const user = email ? 
        await UserModel.findOne({email}).select('+authentication.salt +authentication.password') : 
        await UserModel.findOne({login}).select('+authentication.salt +authentication.password');
      if (!user){
        throw AppError.badRequest("Wrong login, email or password");
      }
      const expectedHash = authentication(user.authentication.salt, password);

      if (user.authentication.password !== expectedHash){
        throw AppError.badRequest("Wrong login, email or password");
      }

      const salt = random();
      user.authentication.sessionToken = authentication(salt, user._id.toString());
      await user.save();
      return { data: {email: user.email, login: user.login, _id: user._id, role: user.role}, token: user.authentication.sessionToken};
    } catch (err) {
      throw err;
    }
  }

  async EditPassword(data: {oldPassword: string, newPassword: string, repeatPassword: string, _id: string}) {
    try{
      const {oldPassword, newPassword, repeatPassword, _id} = data;
      const user = await UserModel.findById(_id).select('+authentication.salt +authentication.password');
      const expectedHash = authentication(user.authentication.salt, oldPassword);

      if (user.authentication.password !== expectedHash){
        throw AppError.badRequest("Wrong old password");
      }

      if (newPassword !== repeatPassword){
        throw AppError.badRequest("Passwords do not match");
      }

      const salt = random();

      user.authentication.salt = salt;
      user.authentication.password = authentication(salt, newPassword);

      await user.save();

      return({email: user.email, login: user.login, _id: user._id, role: user.role});
    } catch(err){
      throw err;
    }

  }
}