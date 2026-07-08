'use client';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Text } from '@gravity-ui/uikit';
import { useT } from 'next-i18next/client';
import { createClient } from '@/lib/supabase/client';
import AuthForm, { type AuthFormData } from '@/components/AuthForm/AuthForm';
import styles from '../auth.module.css';

export default function SignUpPage() {
  const { t } = useT('auth');
  const router = useRouter();
  const { lng } = useParams<{ lng: string }>();
  const supabase = createClient();

  const handleSubmit = async (data: AuthFormData) => {
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

  return (
    <>
      <Text as="h1" variant="header-2" className={styles.title}>
        {t('signup.title')}
      </Text>
      <Text variant="body-1" color="secondary" className={styles.description}>
        {t('signup.description')}
      </Text>
      <AuthForm onSubmit={handleSubmit} submitLabel={t('signup.submit')} />
    </>
  );
}
