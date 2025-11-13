import createHttpError from 'http-errors';

import { appConfig } from '../config';
import { UserModel } from '../models/user.model';
import { verifyAccessToken } from '../utils/token';

import type { NextFunction, Request, Response } from 'express';

/**
 * Ensures the incoming request has a valid JWT stored in the auth cookie.
 */
export const authGuard = async (request: Request, _response: Response, next: NextFunction) => {
  const token = request.cookies?.[appConfig.cookie.name];

  if (!token) {
    throw createHttpError(401, 'Authentication required');
  }

  try {
    const payload = verifyAccessToken(token);
    const user = await UserModel.findById(payload.sub).select('-passwordHash');

    if (!user) {
      throw createHttpError(401, 'Session expired, please login again');
    }

    request.user = user;
    next();
  } catch (error) {
    throw createHttpError(401, 'Invalid or expired token');
  }
};

export const requireRole =
  (...roles: Array<'USER' | 'ADMIN'>) =>
  (request: Request, _response: Response, next: NextFunction) => {
    if (!request.user) {
      throw createHttpError(401, 'Authentication required');
    }

    if (!roles.includes(request.user.role)) {
      throw createHttpError(403, 'You do not have permission to perform this action');
    }

    next();
  };
