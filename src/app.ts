import express, { NextFunction, Request, Response } from 'express';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import { router } from './app/routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from 'passport';
import expressSession from "express-session"
import "./app/config/passport"
import { envVars } from './app/config/env';
const app = express();

//for passport configeration
app.use(expressSession({
  secret: "Your Secret",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.set("trust proxy",1)
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));//form data
app.use(cors({
  origin: envVars.FRONTEND_URL,
  credentials: true //for cookies

}));




app.use('/api/v1', router);



app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: ' welcome to percel delivary management system',
  });
});

app.use(globalErrorHandler)
app.use(notFound)
export default app;
