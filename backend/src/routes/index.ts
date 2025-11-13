import { Router } from 'express';

import { authRoutes } from './auth.routes';
import { itemRoutes } from './item.routes';
import { themeRoutes } from './theme.routes';

import type { Express } from 'express';

/**
 * Central route registry. Each feature module should expose its own router
 * to keep the API surface modular and maintainable.
 */
export const registerRoutes = (app: Express) => {
  const apiRouter = Router();

  apiRouter.use('/auth', authRoutes);
  apiRouter.use('/items', itemRoutes);
  apiRouter.use('/theme', themeRoutes);

  app.use('/api', apiRouter);
};

