import express from 'express';
import cors  from 'cors';

const ExpressApp = async (app: express.Application) => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());
}

export default ExpressApp;