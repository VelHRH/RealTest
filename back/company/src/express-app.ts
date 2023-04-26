import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { companyAPI, appEvents } from "./api";
import { ErrorHandler } from "./utils/error-handler";

const ExpressApp = async (app: express.Application) => {
 app.use(express.json());
 app.use(express.urlencoded({ extended: true, limit: "1mb" }));
 app.use(cors());
 app.use(cookieParser());

 appEvents(app);

 companyAPI(app);

 app.use(ErrorHandler);
};

export default ExpressApp;
