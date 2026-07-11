'use client';

import { useRouter } from 'next/navigation';
import { useT } from 'next-i18next/client';
import { useAuth } from '@/contexts/AuthContext';
import { type SignUpFormData } from '@/features/auth/schemas';
import SignUpForm from '@/features/auth/components/SignUpForm/SignUpForm';
import { useNotify } from '@/hooks/useNotify';

type SignUpHandlerProps = {
  lng: string;
};

export default function SignUpHandler({ lng }: SignUpHandlerProps) {
  const router = useRouter();
  const { t } = useT('auth');
  const { error } = useNotify();
  const { signUp } = useAuth();

  const handleSubmit = async (data: SignUpFormData) => {
    try {
      await signUp(data.email, data.password);
      router.push(`/${lng}`);
      router.refresh();
    } catch (e) {
      const message = (e as Error).message;
      if (message === 'supabase client not available') {
        error(t('authUnavailable'));
      } else {
        error(t('signupError'), message);
      }
    }
  };

  return <SignUpForm onSubmit={handleSubmit} />;
}
