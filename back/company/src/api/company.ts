import { CompanyService } from "../services/CompanyService";
import express from 'express';
import { checkAuth } from "../utils/check-auth";
import axios from 'axios';
import { registerValidation, passwordValidation } from "../utils/validations";
import {validationResult} from 'express-validator'
import {AppError} from '../utils/app-errors'
import { BASE_URL } from "../config";

export const companyAPI = async (app: express.Application) => {
  const service = new CompanyService();

  app.post('/create', checkAuth, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
      const {name, avatarUrl, identity} = req.body;
      const payload = {
        event: 'CHANGE_ROLE', 
        data: {newRole: "Owner", _id: identity}
      }
      await axios.post(`${BASE_URL}/user/app-events/`, {payload});
      const data = await service.CreateCompany({name, avatarUrl, owner: identity});
      res.status(200).json(data);
    } catch (err){
      next(err);
    }
  })
}