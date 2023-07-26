import cookieParser from 'cookie-parser';
import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from "./types";
import { corsMiddleware, errorMiddleware, loggerMiddleware } from './middlewares';
import { projectConfig } from "./config";
import { auth, users } from "@/components";

const app = express();

// cookies
app.use(cookieParser(auth.authConfig.secret));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// cors
app.use(corsMiddleware.cors);

// logger
app.use(loggerMiddleware.logger);

app.use('/api/users', users.userRouter);
app.use('/api/auth', auth.authRouter);

// errors
app.use(errorMiddleware.handleError);


app.get('/', function (req: Request, res: Response) {
    return res.json({ message: `Welcome to ${projectConfig.APP_NAME}'s api !` });
});

export { app };
