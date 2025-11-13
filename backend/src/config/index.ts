import env, { isDevelopment, isProduction, isTest, resolvedCorsOrigins } from './env';

/**
 * Application-wide configuration surface.
 * Additional computed settings should be aggregated here to avoid
 * scattering config logic across the codebase.
 */
export const appConfig = {
  env: env.NODE_ENV,
  isDevelopment,
  isProduction,
  isTest,
  port: env.PORT,
  database: {
    mongoUri: env.MONGO_URI
  },
  cookie: {
    name: env.COOKIE_NAME,
    domain: env.COOKIE_DOMAIN,
    secure: env.COOKIE_SECURE ?? env.NODE_ENV === 'production'
  },
  security: {
    jwtSecret: env.JWT_SECRET,
    jwtExpiresIn: env.JWT_EXPIRES_IN
  },
  cors: {
    origins: resolvedCorsOrigins
  },
  theming: {
    defaultAccent: env.DEFAULT_THEME_ACCENT,
    defaultHighlight: env.DEFAULT_THEME_HIGHLIGHT
  },
  urls: {
    frontend: env.FRONTEND_URL
  },
  logging: {
    level: env.LOG_LEVEL
  }
} as const;

export type AppConfig = typeof appConfig;

