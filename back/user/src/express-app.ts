import express from "express";
import cookieParser from "cookie-parser";
import { userAPI, authAPI, appEvents } from "./api";
import { ErrorHandler } from "./utils/error-handler";

const ExpressApp = async (app: express.Application) => {
 app.use(express.json());
 app.use(express.urlencoded({ extended: true, limit: "1mb" }));

 app.use(cookieParser());

 appEvents(app);

 userAPI(app);
 authAPI(app);

 app.use(ErrorHandler);
};

export default ExpressApp;
