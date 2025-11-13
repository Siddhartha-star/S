import 'express-async-errors';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { appConfig } from './config';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { registerRoutes } from './routes';

export const app = express();

/**
 * Core middleware stack – executes before routes are evaluated.
 * Provides secure defaults and JSON handling for the API.
 */
app.set('trust proxy', 1);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      const allowedOrigins = new Set(appConfig.cors.origins);
      return allowedOrigins.has(origin) ? callback(null, true) : callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  })
);

app.use(helmet());
app.use(
  json({
    limit: '1mb'
  })
);
app.use(
  urlencoded({
    extended: true
  })
);
app.use(cookieParser());
app.use(morgan(appConfig.isDevelopment ? 'dev' : 'combined'));

registerRoutes(app);

app.get('/health', (_request, response) => {
  response.json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

