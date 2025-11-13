import type { NextFunction, Request, Response } from 'express';
import type { AnyZodObject, ZodError } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
  return async (request: Request, _response: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync({
        body: request.body,
        query: request.query,
        params: request.params
      });

      request.body = parsed.body ?? request.body;
      request.query = parsed.query ?? request.query;
      request.params = parsed.params ?? request.params;

      return next();
    } catch (error) {
      return next(error as ZodError);
    }
  };
};

