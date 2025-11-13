import { z } from 'zod';

export const authSignupSchema = z.object({
  fullName: z.string().min(2, 'Full name must contain at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-z]/i, 'Password must contain at least one letter')
    .regex(/\d/, 'Password must contain at least one number'),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
  avatarUrl: z.string().url('Avatar must be a valid URL').optional(),
  theme: z
    .object({
      accent: z.string().optional(),
      highlight: z.string().optional(),
      base: z.string().optional(),
      surface: z.string().optional(),
      glow: z.string().optional(),
      mode: z.enum(['dark', 'light', 'system']).optional()
    })
    .optional()
});

export const authLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

