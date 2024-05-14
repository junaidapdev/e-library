import { config } from "../config/config";
import createHttpError, { HttpError } from 'http-errors';
import express, {NextFunction, Request, Response} from 'express';

const globalErrorHandler = ((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        message: err.message, 
        errorStack: config.env === 'development' ? err.stack : ''
    })
})


export default globalErrorHandler;