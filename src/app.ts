import express, {NextFunction, Request, Response} from 'express';
import createHttpError, { HttpError } from 'http-errors';
import { config } from './config/config';
import { error } from 'console';
import globalErrorHandler from './middlewares/GlobalErrorHandler';

const app = express();


// Routes 
// Http Methods : Get, POST, PUT, DELETE, PATCH
app.get('/', (req, res, next) => {
    

    const error = createHttpError(400, 'something went wrong');
    throw error;

    res.json({message: 'Welcome to Elibrary!'});
})


// Gloabal Error handler
app.use(globalErrorHandler);

export default app