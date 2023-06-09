import express from "express";
import cookieParser from "cookie-parser";
import { companyAPI, appEvents, deviceAPI } from "./api";
import { ErrorHandler } from "./utils/error-handler";

const ExpressApp = async (app: express.Application) => {
 app.use(express.json());
 app.use(express.urlencoded({ extended: true, limit: "10mb" }));
 app.use(cookieParser());

 appEvents(app);

 companyAPI(app);
 deviceAPI(app);

 app.use(ErrorHandler);
};

export default ExpressApp;
