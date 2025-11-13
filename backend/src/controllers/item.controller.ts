import createHttpError from 'http-errors';
import { Types } from 'mongoose';

import { ItemModel } from '../models';
import {
  createItemSchema,
  itemIdParamSchema,
  listItemsQuerySchema,
  updateItemSchema
} from '../validators/item.validators';

import type { Request, Response } from 'express';

/**
 * Lists items for the current user. Admins can optionally filter by owner.
 */
export const listItems = async (request: Request, response: Response) => {
  if (!request.user) {
    throw createHttpError(401, 'Authentication required');
  }

  const queryPayload = listItemsQuerySchema.parse(request.query);
  const filter: Record<string, unknown> = {};

  if (queryPayload.status) {
    filter.status = queryPayload.status;
  }

  if (request.user.role === 'ADMIN' && queryPayload.owner) {
    filter.owner = new Types.ObjectId(queryPayload.owner);
  } else {
    filter.owner = request.user._id;
  }

  const items = await ItemModel.find(filter).sort({ createdAt: -1 }).lean();

  response.json({
    items
  });
};

/**
 * Creates a new item owned by the authenticated user.
 */
export const createItem = async (request: Request, response: Response) => {
  if (!request.user) {
    throw createHttpError(401, 'Authentication required');
  }

  const payload = createItemSchema.parse(request.body);

  const item = await ItemModel.create({
    owner: request.user._id,
    title: payload.title,
    description: payload.description,
    status: payload.status,
    dueDate: payload.dueDate,
    xpReward: payload.xpReward
  });

  response.status(201).json({
    item: item.toJSON()
  });
};

/**
 * Updates an item when the caller is the owner or an admin.
 */
export const updateItem = async (request: Request, response: Response) => {
  if (!request.user) {
    throw createHttpError(401, 'Authentication required');
  }

  const { id } = itemIdParamSchema.parse(request.params);
  const payload = updateItemSchema.parse(request.body);

  const item = await ItemModel.findById(id);

  if (!item) {
    throw createHttpError(404, 'Item not found');
  }

  const isOwner = item.owner.equals(request.user._id);
  if (!isOwner && request.user.role !== 'ADMIN') {
    throw createHttpError(403, 'You do not have permission to modify this item');
  }

  item.set({
    ...payload
  });

  await item.save();

  response.json({
    item: item.toJSON()
  });
};

/**
 * Deletes an item when the caller is the owner or an admin.
 */
export const deleteItem = async (request: Request, response: Response) => {
  if (!request.user) {
    throw createHttpError(401, 'Authentication required');
  }

  const { id } = itemIdParamSchema.parse(request.params);
  const item = await ItemModel.findById(id);

  if (!item) {
    throw createHttpError(404, 'Item not found');
  }

  const isOwner = item.owner.equals(request.user._id);
  if (!isOwner && request.user.role !== 'ADMIN') {
    throw createHttpError(403, 'You do not have permission to delete this item');
  }

  await item.deleteOne();

  response.status(204).send();
};
