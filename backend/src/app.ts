import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes'
import errorHandler from './middleware/error.middleware';
import { protect } from './middleware/auth.middleware';
import { apiLimiter, authLimiter } from './middleware/rateLimiter';

const app: Application = express();

app.set('trust proxy', 1);

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api', apiLimiter);
app.use('/api/auth',authLimiter, authRoutes);
app.use('/api/task', protect, taskRoutes)

app.use(errorHandler);

export default app;