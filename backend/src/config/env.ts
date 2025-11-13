/**
 * Centralised environment variable parsing using Zod to guarantee
 * type-safety and fail-fast behaviour across the API server.
 */
import { config as loadDotEnv } from 'dotenv';
import { z } from 'zod';

loadDotEnv();

const booleanFromEnv = z
  .union([z.string(), z.boolean()])
  .transform((value) => {
    if (typeof value === 'boolean') {
      return value;
    }

    if (value === undefined) {
      return undefined;
    }

    return ['true', '1', 'yes', 'on'].includes(value.toLowerCase());
  })
  .optional();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  MONGO_URI: z.string().min(1, 'MONGO_URI is required'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  JWT_EXPIRES_IN: z.string().default('15m'),
  COOKIE_NAME: z.string().default('snapsearch_session'),
  COOKIE_DOMAIN: z.string().optional(),
  COOKIE_SECURE: booleanFromEnv,
  FRONTEND_URL: z.string().url('FRONTEND_URL must be a valid URL').default('http://localhost:3000'),
  CORS_ORIGIN: z.string().url().default('http://localhost:3000'),
  CORS_ORIGINS: z.string().optional(),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  DEFAULT_THEME_ACCENT: z.string().default('#0091ff'),
  DEFAULT_THEME_HIGHLIGHT: z.string().default('#ff00b7')
});

const parsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  COOKIE_NAME: process.env.COOKIE_NAME,
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
  COOKIE_SECURE: process.env.COOKIE_SECURE,
  FRONTEND_URL: process.env.FRONTEND_URL,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  CORS_ORIGINS: process.env.CORS_ORIGINS,
  LOG_LEVEL: process.env.LOG_LEVEL,
  DEFAULT_THEME_ACCENT: process.env.DEFAULT_THEME_ACCENT,
  DEFAULT_THEME_HIGHLIGHT: process.env.DEFAULT_THEME_HIGHLIGHT
});

if (!parsed.success) {
  console.error('❌ Invalid environment configuration:', parsed.error.flatten().fieldErrors);
  throw new Error('Environment validation failed. Please review your .env file.');
}

const env = parsed.data;

const corsOrigins = new Set<string>();
corsOrigins.add(env.CORS_ORIGIN);

if (env.CORS_ORIGINS) {
  env.CORS_ORIGINS.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
    .forEach((origin) => corsOrigins.add(origin));
}

corsOrigins.add(env.FRONTEND_URL);

export const isDevelopment = env.NODE_ENV === 'development';
export const isTest = env.NODE_ENV === 'test';
export const isProduction = env.NODE_ENV === 'production';

export default env;
export const resolvedCorsOrigins = [...corsOrigins];

