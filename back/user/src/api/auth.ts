import { AuthService } from "../services/AuthService";
import express from 'express'
import { checkAuth } from "../utils/check-auth";

export const authAPI = async (app: express.Application) => {
  const service = new AuthService();

  app.post('/register', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
      const {email, login, password, name} = req.body;
      const data = await service.RegisterUser({email, login, password, name});
      return res.status(200).json(data);
    } catch(err){
      next(err);
    }
  });

  app.post('/login', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
      const {email, login, password} = req.body;
      const {data, token} = await service.LoginUser({email, login, password});
      res.cookie('COOKIE_AUTH', token, {domain: 'localhost', path: '/'});
      return res.status(200).json(data);
    } catch(err){
      next(err);
    }
  });

  app.post('/logout', checkAuth, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
      res.clearCookie('COOKIE_AUTH');
      return res.status(200).json({message: "success"}).end();
    } catch (err) {
      next(err);
    }
  });

  app.put('/changePassword', checkAuth, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
      const {oldPassword, newPassword, repeatPassword} = req.body;
      const _id = req.body.identity;
      await service.EditPassword({oldPassword, newPassword, repeatPassword, _id});
      return res.status(200).json({message: "success"}).end();
    } catch (err) {
      next(err);
    }
  });
}