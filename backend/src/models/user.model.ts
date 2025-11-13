import { Schema, model, models } from 'mongoose';

import type { Model } from 'mongoose';

export type UserRole = 'USER' | 'ADMIN';

export interface User {
  fullName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },
    avatarUrl: {
      type: String
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        delete ret.passwordHash;
        return ret;
      }
    }
  }
);

export const UserModel = (models.User as Model<User> | undefined) ?? model<User>('User', userSchema);

