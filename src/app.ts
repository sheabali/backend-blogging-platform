import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { router } from './app/routes';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

// application routes
app.use('/api/', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello developers!!!');
});

export default app;
