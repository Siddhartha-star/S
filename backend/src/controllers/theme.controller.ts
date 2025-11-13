import createHttpError from 'http-errors';

import { ThemePreferenceModel } from '../models';
import { defaultTheme, serializeTheme } from '../utils/theme';
import { updateThemeSchema } from '../validators/theme.validators';

import type { Request, Response } from 'express';

/**
 * Retrieves the saved theme or falls back to defaults.
 */
export const getTheme = async (request: Request, response: Response) => {
  if (!request.user) {
    throw createHttpError(401, 'Authentication required');
  }

  const theme = await ThemePreferenceModel.findOne({ user: request.user._id }).lean().exec();

  response.json({
    theme: serializeTheme(theme)
  });
};

/**
 * Persists theme adjustments for the authenticated user.
 */
export const saveTheme = async (request: Request, response: Response) => {
  if (!request.user) {
    throw createHttpError(401, 'Authentication required');
  }

  const payload = updateThemeSchema.parse(request.body);

  const update: Record<string, unknown> = {};

  if (payload.accent !== undefined) update.accent = payload.accent;
  if (payload.highlight !== undefined) update.highlight = payload.highlight;
  if (payload.base !== undefined) update.base = payload.base;
  if (payload.surface !== undefined) update.surface = payload.surface;
  if (payload.glow !== undefined) update.glow = payload.glow;
  if (payload.mode !== undefined) update.mode = payload.mode;

  const theme = await ThemePreferenceModel.findOneAndUpdate(
    { user: request.user._id },
    {
      ...(Object.keys(update).length ? { $set: update } : {}),
      $setOnInsert: {
        accent: defaultTheme.accent,
        highlight: defaultTheme.highlight,
        base: defaultTheme.base,
        surface: defaultTheme.surface,
        glow: defaultTheme.glow,
        mode: defaultTheme.mode
      }
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  )
    .lean()
    .exec();

  response.json({
    theme: serializeTheme(theme)
  });
};
