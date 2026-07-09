'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { type SignUpFormData } from '@/features/auth/schemas';
import SignUpForm from '@/features/auth/components/SignUpForm/SignUpForm';

type SignUpHandlerProps = {
  lng: string;
};

export default function SignUpHandler({ lng }: SignUpHandlerProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (data: SignUpFormData) => {
    if (!supabase) return;

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      console.error('Sign up error:', error);
      return;
    }

    router.push(`/${lng}`);
    router.refresh();
  };

  return <SignUpForm onSubmit={handleSubmit} />;
}
