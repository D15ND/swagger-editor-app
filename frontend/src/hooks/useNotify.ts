'use client';

import { useToaster, type ToastTheme } from '@gravity-ui/uikit';

export function useNotify() {
  const { add } = useToaster();

  function push(theme: ToastTheme, title: string, content?: string) {
    add({
      name: crypto.randomUUID(),
      title,
      content,
      theme,
      isClosable: true,
    });
  }

  function bind(theme: ToastTheme) {
    return (title: string, content?: string) => push(theme, title, content);
  }

  return {
    success: bind('success'),
    error: bind('danger'),
    info: bind('info'),
  };
}
