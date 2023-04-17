import { UserService } from "../services/UserService";
import express from 'express'

export const appEvents = async (app: express.Application) => {
  const service = new UserService();

  app.use('/user/app-events', service.SubscribeEvents);
}