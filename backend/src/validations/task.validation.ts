import Joi from "joi";

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    'string.base': 'Title must be text',
    'string.empty': 'Title cannot be empty',
    'string.min': 'Title must be at least 3 characters long',
    'any.required': 'Title is required',
  }),
  description: Joi.string().allow('').optional(),
  isCompleted: Joi.boolean().optional(),
});


export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).optional(),
  description: Joi.string().allow('').optional(),
  isCompleted: Joi.boolean().optional(),
});