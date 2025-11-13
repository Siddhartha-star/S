import { Schema, model, models, Types } from 'mongoose';

import type { Model } from 'mongoose';

export type ItemStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface Item {
  owner: Types.ObjectId;
  title: string;
  description?: string;
  status: ItemStatus;
  dueDate?: Date;
  xpReward: number;
  createdAt: Date;
  updatedAt: Date;
}

const itemSchema = new Schema<Item>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
      default: 'PENDING'
    },
    dueDate: {
      type: Date
    },
    xpReward: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

export const ItemModel = (models.Item as Model<Item> | undefined) ?? model<Item>('Item', itemSchema);

