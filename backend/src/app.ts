import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
const app: Application = express();

app.use(express.json()); 
app.use(cors()); 
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ 
    message: 'Task Manager Pro API is running', 
    timestamp: new Date().toISOString() 
  });
});

export default app;