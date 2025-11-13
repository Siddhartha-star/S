import { appConfig } from '../config';

import type { ThemePreference } from '../models';

export const defaultTheme = {
  accent: appConfig.theming.defaultAccent,
  highlight: appConfig.theming.defaultHighlight,
  base: 'rgba(17, 24, 39, 0.78)',
  surface: 'rgba(30, 41, 59, 0.66)',
  glow: 'rgba(0, 145, 255, 0.45)',
  mode: 'dark' as const
};

export const serializeTheme = (theme?: ThemePreference | null) => {
  if (!theme) {
    return defaultTheme;
  }

  return {
    accent: theme.accent,
    highlight: theme.highlight,
    base: theme.base,
    surface: theme.surface,
    glow: theme.glow,
    mode: theme.mode
  };
};

