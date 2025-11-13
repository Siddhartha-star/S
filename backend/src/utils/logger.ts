import pinoLogger from 'pino';

import { appConfig } from '../config';

/**
 * Lightweight Pino logger configured for production readiness.
 * Uses pretty-printing automatically in development for readability.
 */
export const logger = pinoLogger({
  name: 'snapsearch-backend',
  level: appConfig.logging.level,
  transport: appConfig.isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname'
        }
      }
    : undefined
});

