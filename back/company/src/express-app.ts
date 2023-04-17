import express from 'express';
import cors  from 'cors';
import {userAPI, authAPI, appEvents} from './api'
import {ErrorHandler} from './utils/error-handler'

const ExpressApp = async (app: express.Application) => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());

    appEvents(app);

    userAPI(app);
    authAPI(app);

    app.use(ErrorHandler);
}

export default ExpressApp;