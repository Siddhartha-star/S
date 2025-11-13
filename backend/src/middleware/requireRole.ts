import createHttpError from 'http-errors';

import type { UserRole } from '../models';
import type { NextFunction, Request, Response } from 'express';

export const requireRole =
  (...roles: UserRole[]) =>
  (request: Request, _response: Response, next: NextFunction) => {
    if (!request.user) {
      throw createHttpError(401, 'Authentication required');
    }

    if (!roles.includes(request.user.role)) {
      throw createHttpError(403, 'Insufficient permissions');
    }

    next();
  };

