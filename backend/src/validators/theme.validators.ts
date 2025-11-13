import { z } from 'zod';

export const updateThemeSchema = z.object({
  accent: z.string().optional(),
  highlight: z.string().optional(),
  base: z.string().optional(),
  surface: z.string().optional(),
  glow: z.string().optional(),
  mode: z.enum(['dark', 'light', 'system']).optional()
});


