import express from 'express';
import {config} from 'dotenv'
import expressApp from './express-app.js'

const StartUserService = async () => {

  config();

  const app = express();

  await expressApp(app);

  app.use('/', (req, res, next) => {
    res.json({"msg": "Success"});
  });

  app.listen(process.env.PORT, () => {
    console.log(`User service working on port ${process.env.PORT}!`)
  });
}

StartUserService();

