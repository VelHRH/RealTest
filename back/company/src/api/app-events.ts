import express from 'express';
import { CompanyService } from '../services/CompanyService';
import { DeviceService } from '../services/DeviceService';

export const appEvents = async (app: express.Application) => {
  const serviceDevice = new DeviceService();
  const serviceCompany = new CompanyService();

  app.use('/app-events', async (req: express.Request, res: express.Response) => {
    const { payload } = req.body;
    const result =
      payload.event === 'GET_COMPANY_BY_ID'
        ? await serviceCompany.SubscribeEvents(payload)
        : await serviceDevice.SubscribeEvents(payload);
    console.log('============= App Event ================');
    return res.status(200).json(result);
  });
};
