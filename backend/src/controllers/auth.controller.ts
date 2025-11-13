import { compare, hash } from 'bcryptjs';
import createHttpError from 'http-errors';

import { ThemePreferenceModel, UserModel } from '../models';
import { clearAuthCookie, setAuthCookie } from '../utils/cookies';
import { defaultTheme, serializeTheme } from '../utils/theme';
import { generateAccessToken } from '../utils/token';
import { authLoginSchema, authSignupSchema } from '../validators/auth.validators';

import type { Request, Response } from 'express';

/**
 * Handles new user registration flows and immediately signs the user in.
 */
export const signup = async (request: Request, response: Response) => {
  const payload = authSignupSchema.parse(request.body);

  const existingUser = await UserModel.findOne({ email: payload.email });
  if (existingUser) {
    throw createHttpError(409, 'Email is already registered');
  }

  const passwordHash = await hash(payload.password, 12);

  const user = await UserModel.create({
    fullName: payload.fullName,
    email: payload.email,
    passwordHash,
    role: payload.role,
    avatarUrl: payload.avatarUrl
  });

  await ThemePreferenceModel.findOneAndUpdate(
    { user: user._id },
    {
      accent: payload.theme?.accent ?? defaultTheme.accent,
      highlight: payload.theme?.highlight ?? defaultTheme.highlight,
      base: payload.theme?.base ?? defaultTheme.base,
      surface: payload.theme?.surface ?? defaultTheme.surface,
      glow: payload.theme?.glow ?? defaultTheme.glow,
      mode: payload.theme?.mode ?? defaultTheme.mode
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const token = generateAccessToken({
    sub: user.id,
    role: user.role,
    email: user.email
  });

  setAuthCookie(response, token);

  response.status(201).json({
    user: user.toJSON(),
    theme: serializeTheme(
      await ThemePreferenceModel.findOne({ user: user._id })
        .lean()
        .exec()
    )
  });
};

/**
 * Authenticates the user and returns their profile + theme data.
 */
export const login = async (request: Request, response: Response) => {
  const payload = authLoginSchema.parse(request.body);

  const user = await UserModel.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isPasswordValid = await compare(payload.password, user.passwordHash);
  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const token = generateAccessToken({
    sub: user.id,
    role: user.role,
    email: user.email
  });

  setAuthCookie(response, token);

  response.json({
    user: user.toJSON(),
    theme: serializeTheme(
      await ThemePreferenceModel.findOne({ user: user._id })
        .lean()
        .exec()
    )
  });
};

/**
 * Returns the authenticated user's profile.
 */
export const me = async (request: Request, response: Response) => {
  if (!request.user) {
    throw createHttpError(401, 'Authentication required');
  }

  response.json({
    user: request.user.toJSON(),
    theme: serializeTheme(
      await ThemePreferenceModel.findOne({ user: request.user._id })
        .lean()
        .exec()
    )
  });
};

/**
 * Clears the auth cookie to invalidate the session.
 */
export const logout = async (_request: Request, response: Response) => {
  clearAuthCookie(response);
  response.status(204).send();
};

