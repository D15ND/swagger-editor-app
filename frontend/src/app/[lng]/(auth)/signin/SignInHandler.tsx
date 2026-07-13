'use client';

import { useRouter } from 'next/navigation';
import { useT } from 'next-i18next/client';
import { useAuth } from '@/contexts/AuthContext';
import { type SignInFormData } from '@/features/auth/schemas';
import SignInForm from '@/features/auth/components/SignInForm/SignInForm';
import { useNotify } from '@/hooks/useNotify';

type SignInHandlerProps = {
  lng: string;
};

export default function SignInHandler({ lng }: SignInHandlerProps) {
  const router = useRouter();
  const { t } = useT('auth');
  const { error } = useNotify();
  const { signIn } = useAuth();

  const handleSubmit = async (data: SignInFormData) => {
    try {
      await signIn(data.email, data.password);
      router.push(`/${lng}`);
      router.refresh();
    } catch (e) {
      const message = (e as Error).message;
      if (message === 'supabase client not available') {
        error(t('authUnavailable'));
      } else {
        error(t('signinError'), message);
      }
    }
  };

  return <SignInForm onSubmit={handleSubmit} />;
}
