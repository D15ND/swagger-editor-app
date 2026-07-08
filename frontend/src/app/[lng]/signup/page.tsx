'use client';

import { useRouter } from 'next/navigation';
import { Text } from '@gravity-ui/uikit';
import { useT } from 'next-i18next/client';
import { createClient } from '@/lib/supabase/client';
import AuthForm, { type AuthFormData } from '@/components/AuthForm/AuthForm';
import styles from './signup.module.css';

export default function SignUpPage() {
  const { t } = useT('auth');
  const router = useRouter();

  const handleSubmit = async (data: AuthFormData) => {
    const supabase = createClient();
    if (!supabase) return;

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      console.error('Sign up error:', error);
      return;
    }

    router.push('/');
    router.refresh();
  };

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <Text as="h1" variant="header-2" className={styles.title}>
          {t('signup.title')}
        </Text>
        <Text variant="body-1" color="secondary" className={styles.description}>
          {t('signup.description')}
        </Text>
        <AuthForm onSubmit={handleSubmit} submitLabel={t('signup.submit')} />
      </div>
    </main>
  );
}
