export type ThemeToken = 'aurora' | 'sunset' | 'galaxy';

export interface ThemePreset {
  token: ThemeToken;
  name: string;
  gradient: string;
  accent: string;
  highlight: string;
  description: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    token: 'aurora',
    name: 'Aurora',
    gradient: 'linear-gradient(135deg, #0091ff 0%, #ff00b7 100%)',
    accent: '#0091ff',
    highlight: '#ff00b7',
    description: 'Electric neon blend inspired by northern lights.'
  },
  {
    token: 'sunset',
    name: 'Sunset',
    gradient: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',
    accent: '#ff7e5f',
    highlight: '#feb47b',
    description: 'Warm summer palette with cinematic sunlight glow.'
  },
  {
    token: 'galaxy',
    name: 'Galaxy',
    gradient: 'linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)',
    accent: '#3a1c71',
    highlight: '#ffaf7b',
    description: 'Deep-space purples with cosmic fuchsia and amber.'
  }
];

export const resolveThemePreset = (token?: ThemeToken | null) => {
  if (!token) {
    return THEME_PRESETS[0];
  }
  return THEME_PRESETS.find((preset) => preset.token === token) ?? THEME_PRESETS[0];
};




