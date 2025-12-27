import { Request, Response } from 'express';
import * as taskService from '../services/task.service';

const getUserId = (req: Request): string => {
  if (!req.user) {
    throw new Error('User not found in request');
  }
  return req.user._id.toString(); 
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.createTask(getUserId(req), req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const result = await taskService.findAllTasks(getUserId(req), req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.findTaskById(getUserId(req), req.params.id);
    res.status(200).json(task);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.updateTask(getUserId(req), req.params.id, req.body);
    res.status(200).json(task);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    await taskService.deleteTask(getUserId(req), req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};