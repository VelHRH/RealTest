import express from "express";
import { PORT } from "./config";
import expressApp from "./express-app";
import { dbConnection } from "./database/connection";

const StartUserService = async () => {
 const app = express();

 await dbConnection();

 await expressApp(app);

 app.listen(PORT, () => {
  console.log(`Test service working on port ${PORT}!`);
 });
};

StartUserService();
