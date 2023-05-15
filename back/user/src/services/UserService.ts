// @ts-nocheck

import { AppError } from "../utils/app-errors";
import { UserModel } from "../database/models/User";

export class UserService {
 async GetProfileByID(id: string) {
  try {
   const existingUser = await UserModel.findById(id);
   if (!existingUser) {
    throw AppError.badRequest("User doesn't exist");
   }
   return existingUser;
  } catch (err) {
   throw err;
  }
 }

 async GetAllProfiles() {
  try {
   const existingUsers = await UserModel.find();
   return existingUsers;
  } catch (err) {
   throw err;
  }
 }

 async GetProfileByToken(token: string) {
  try {
   const existingUser = UserModel.findOne({
    "authentication.sessionToken": token,
   });
   if (!existingUser) {
    throw AppError.badRequest("User session doesn't exist");
   }
   return existingUser;
  } catch (err) {
   throw err;
  }
 }

 async ChangeRole(newRole: string, login: string) {
  try {
   await UserModel.findOneAndUpdate({ login }, { role: newRole });
  } catch (err) {
   throw err;
  }
 }

 async SubscribeEvents(payload: { event: string; data: object }) {
  const { event, data } = payload;
  let result;
  switch (event) {
   case "GET_PROFILE_BY_ID":
    result = await this.GetProfileByID(data.id);
    break;
   case "GET_PROFILE_BY_TOKEN":
    result = await this.GetProfileByToken(data.token);
    break;
   case "CHANGE_ROLE":
    result = await this.ChangeRole(data.newRole, data.login);
    break;
   default:
    break;
  }
  return result;
 }
}
