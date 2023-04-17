import { AppError } from './app-errors';
import express from 'express'

export const ErrorHandler: express.ErrorRequestHandler = async(err, req, res, next) => {
    console.error(err);
    if (err instanceof AppError){
        res.status(err.statusCode).json({error: err.message});
        return;
    }
    res.status(500).json({error: "Something went wrong"});
}
