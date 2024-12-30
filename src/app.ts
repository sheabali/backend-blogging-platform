import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/global.ErrorHandler';
import notFound from './app/middlewares/notFound';
import { router } from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

// application routes
app.use('/api', router);

const test = async (req: Request, res: Response) => {
  res.send(
    `<div style="background: linear-gradient(135deg, #6a11cb, #2575fc); border-radius: 20px; width: 600px; height: 250px; margin: auto; margin-top: 50px; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); display: flex; flex-direction: column; justify-content: center; align-items: center;">
       <h1 style="color: white; font-family: Arial, sans-serif; font-size: 24px; margin: 0; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);">Welcome to the Blog Server!</h1>
     
     </div>`,
  );
};

app.get('/', test);

// Error-handling middleware
app.use(globalErrorHandler);
app.use(notFound);

export default app;
