export type Theme = 'light' | 'dark';

export const THEME_LIGHT = 'light' as const;
export const THEME_DARK = 'dark' as const;

export const STORAGE_KEY = 'swagger-editor-theme';
export const HEADER_KEY = 'x-theme';

export const ROOT_CLASS = 'g-root';

export function getThemeClass(theme: Theme): string {
  return `${ROOT_CLASS} ${ROOT_CLASS}_theme_${theme}`;
}
