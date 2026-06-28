export const STORAGE_KEY = 'swagger-editor-theme';

export const ROOT_CLASS = 'g-root';

export function getThemeClass(theme: string): string {
  if (theme === 'dark' || theme === 'light') {
    return `${ROOT_CLASS} ${ROOT_CLASS}_theme_${theme}`;
  }
  return ROOT_CLASS;
}
