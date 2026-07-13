'use client';

import {
  Toaster,
  ToasterProvider as GravityToasterProvider,
  ToasterComponent,
} from '@gravity-ui/uikit';

const toaster = new Toaster();

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <GravityToasterProvider toaster={toaster}>
      {children}
      <ToasterComponent />
    </GravityToasterProvider>
  );
}
