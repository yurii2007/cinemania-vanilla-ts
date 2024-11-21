export const themeVariants = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

type themeKeys = keyof typeof themeVariants;

export type ThemeVariants = (typeof themeVariants)[themeKeys];
