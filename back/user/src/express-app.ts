import express from 'express';
import cors  from 'cors';
import {userAPI, authAPI} from './api'

const ExpressApp = async (app: express.Application) => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());

    userAPI(app);
}

export default ExpressApp;