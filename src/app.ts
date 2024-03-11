import { join } from 'path';
import dotenv from 'dotenv';
import express, { Request, Response, Application } from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import router from './routes';
import loggerMiddleware from './middleware/logger';

const app: Application = express();
dotenv.config();

app.use(loggerMiddleware)
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: false }));
app.use(cookieParser());
app.use(compression());
app.use('/node/api', router);


app.disable('x-powered-by');

export default app;