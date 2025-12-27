import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes';
import errorHandler from './middleware/error.middleware';

const app: Application = express();

app.use(express.json()); 
app.use(cors()); 
app.use(morgan('dev')); 


app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ 
    message: 'Task Manager Pro API is running', 
    timestamp: new Date().toISOString() 
  });
});


app.use(errorHandler);

export default app;