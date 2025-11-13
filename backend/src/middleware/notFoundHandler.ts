import type { Request, Response } from 'express';

export const notFoundHandler = (_request: Request, response: Response) => {
  response.status(404).json({
    message: 'Resource not found'
  });
};

