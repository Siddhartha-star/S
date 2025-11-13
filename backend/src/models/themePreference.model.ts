import { Schema, model, models, Types } from 'mongoose';

import type { Model } from 'mongoose';

export interface ThemePreference {
  user: Types.ObjectId;
  accent: string;
  highlight: string;
  base: string;
  surface: string;
  glow?: string;
  mode: 'dark' | 'light' | 'system';
  createdAt: Date;
  updatedAt: Date;
}

const themePreferenceSchema = new Schema<ThemePreference>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: true
    },
    accent: {
      type: String,
      required: true
    },
    highlight: {
      type: String,
      required: true
    },
    base: {
      type: String,
      required: true
    },
    surface: {
      type: String,
      required: true
    },
    glow: {
      type: String
    },
    mode: {
      type: String,
      enum: ['dark', 'light', 'system'],
      default: 'dark'
    }
  },
  {
    timestamps: true
  }
);

export const ThemePreferenceModel =
  (models.ThemePreference as Model<ThemePreference> | undefined) ??
  model<ThemePreference>('ThemePreference', themePreferenceSchema);

