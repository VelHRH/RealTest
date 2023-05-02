import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { testAPI, appEvents, resultAPI, productAPI } from "./api";
import { ErrorHandler } from "./utils/error-handler";

const ExpressApp = async (app: express.Application) => {
 app.use(express.json());
 app.use(express.urlencoded({ extended: true, limit: "1mb" }));
 app.use(cors());
 app.use(cookieParser());

 appEvents(app);

 testAPI(app);
 resultAPI(app);
 productAPI(app);

 app.use(ErrorHandler);
};

export default ExpressApp;
