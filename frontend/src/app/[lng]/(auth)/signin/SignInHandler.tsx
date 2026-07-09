'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { type SignInFormData } from '@/features/auth/schemas';
import SignInForm from '@/features/auth/components/SignInForm/SignInForm';

type SignInHandlerProps = {
  lng: string;
};

export default function SignInHandler({ lng }: SignInHandlerProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (data: SignInFormData) => {
    if (!supabase) return;

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      console.error('Sign in error:', error);
      return;
    }

    router.push(`/${lng}`);
    router.refresh();
  };

  return <SignInForm onSubmit={handleSubmit} />;
}
