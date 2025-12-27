import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet'

import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes'
import errorHandler from './middleware/error.middleware';
import { apiLimiter, authLimiter } from './middleware/rateLimiter';
import { configDotenv } from 'dotenv';

configDotenv()

const frontendUrl = process.env.FRONTEND_URL

console.log(frontendUrl)

const app: Application = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: frontendUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(morgan('dev'));


app.use('/api', apiLimiter);
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/task', taskRoutes)

app.use(errorHandler);

export default app;