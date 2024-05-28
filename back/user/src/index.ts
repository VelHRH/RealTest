import express from "express";
import { PORT } from "./config";
import expressApp from "./express-app";
import { dbConnection } from "./database/connection";

export const StartUserService = async () => {
 const app = express();

 await dbConnection();

 await expressApp(app);

 return app.listen(PORT, () => {
  console.log(`User service working on port ${PORT}!`);
 });
};

const server = StartUserService();

export default server;
