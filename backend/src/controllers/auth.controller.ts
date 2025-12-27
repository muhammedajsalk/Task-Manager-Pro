import { Request, Response, NextFunction } from 'express';
import { register, login } from '../services/auth.service';
import tryCatch from '../utils/tryCatch';

export const registerUser = tryCatch(async (req: Request, res: Response) => {
  const userData = await register(req.body);
  res.status(201).json(userData);
});

export const loginUser = tryCatch(async (req: Request, res: Response) => {
  const userData = await login(req.body);
  res.json(userData);
});