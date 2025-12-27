import Task, { ITask } from '../models/task';

interface TaskFilters {
  search?: string;
  isCompleted?: string;
  page?: number;
  limit?: number;
}

export const createTask = async (userId: string, data: Partial<ITask>) => {
  return await Task.create({ ...data, user: userId });
};

export const findAllTasks = async (userId: string, filters: TaskFilters) => {
  const { search, isCompleted, page = 1, limit = 10 } = filters;
  const query: any = { user: userId };

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }
  
  if (isCompleted !== undefined) {
    query.isCompleted = isCompleted === 'true';
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [tasks, total] = await Promise.all([
    Task.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Task.countDocuments(query)
  ]);

  return { tasks, total, page: Number(page), pages: Math.ceil(total / Number(limit)) };
};

export const findTaskById = async (userId: string, taskId: string) => {
  const task = await Task.findOne({ _id: taskId, user: userId });
  if (!task) throw new Error('Task not found');
  return task;
};

export const updateTask = async (userId: string, taskId: string, updates: Partial<ITask>) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    updates,
    { new: true, runValidators: true }
  );
  if (!task) throw new Error('Task not found');
  return task;
};

export const deleteTask = async (userId: string, taskId: string) => {
  const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
  if (!task) throw new Error('Task not found');
  return task;
};