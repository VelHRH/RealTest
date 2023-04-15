import { AppError } from './app-errors';
import express from 'express'

export const ErrorHandler = async(err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    if (err instanceof AppError){
        res.status(err.statusCode).json({error: err.message});
        return;
    }
    res.status(500).json({error: "Something went wrong"});
}
