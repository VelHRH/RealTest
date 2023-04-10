import express from 'express';
import {config} from 'dotenv'
import expressApp from './express-app'

const StartUserService = async () => {

  config();

  const app = express();

  await expressApp(app);

  app.use('/', (req: express.Request, res: express.Response) => {
    res.json({"msg": "Success"});
  });

  app.listen(process.env.PORT, () => {
    console.log(`User service working on port ${process.env.PORT}!`)
  });
}

StartUserService();

