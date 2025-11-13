import { Types } from 'mongoose';
import { z } from 'zod';

export const itemStatusEnum = z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']);

export const createItemSchema = z.object({
  title: z.string().min(2).max(120),
  description: z.string().max(500).optional(),
  status: itemStatusEnum.default('PENDING'),
  dueDate: z
    .string()
    .datetime()
    .optional()
    .transform((value) => (value ? new Date(value) : undefined)),
  xpReward: z.number().int().min(0).default(0)
});

export const updateItemSchema = z.object({
  title: z.string().min(2).max(120).optional(),
  description: z.string().max(500).optional(),
  status: itemStatusEnum.optional(),
  dueDate: z
    .string()
    .datetime()
    .optional()
    .transform((value) => (value ? new Date(value) : undefined)),
  xpReward: z.number().int().min(0).optional()
});

export const itemIdParamSchema = z.object({
  id: z
    .string()
    .refine((value) => Types.ObjectId.isValid(value), 'Invalid item identifier')
});

export const listItemsQuerySchema = z.object({
  status: itemStatusEnum.optional(),
  owner: z
    .string()
    .optional()
    .refine((value) => (value ? Types.ObjectId.isValid(value) : true), 'Invalid owner identifier')
});

