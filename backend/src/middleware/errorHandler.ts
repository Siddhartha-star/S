import createHttpError from 'http-errors';
import { ZodError } from 'zod';

import { logger } from '../utils/logger';

import type { NextFunction, Request, Response } from 'express';

interface ErrorResponse {
  message: string;
  statusCode: number;
  issues?: Array<{ path: string; message: string }>;
}

type HttpErrorWithIssues = createHttpError.HttpError & { issues?: ErrorResponse['issues'] };

export const errorHandler = (
  error: unknown,
  _request: Request,
  response: Response<ErrorResponse>,
  _next: NextFunction
) => {
  let normalizedError: HttpErrorWithIssues;

  if (error instanceof ZodError) {
    normalizedError = createHttpError(422, 'Validation failed', {
      issues: error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message
      }))
    });
  } else if (createHttpError.isHttpError(error)) {
    normalizedError = error as HttpErrorWithIssues;
  } else {
    logger.error(error, 'Unhandled exception occurred');
    normalizedError = createHttpError(500, 'Unexpected server error');
  }

  const statusCode = normalizedError.statusCode ?? 500;
  const message = normalizedError.message ?? 'Unexpected server error';
  const issues = normalizedError.issues;

  response.status(statusCode).json({
    message,
    statusCode,
    ...(issues ? { issues } : {})
  });
};

