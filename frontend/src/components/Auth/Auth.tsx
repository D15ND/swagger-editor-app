'use client';

import { Button, Spin, Text, TextInput } from '@gravity-ui/uikit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useT } from 'next-i18next/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './Auth.module.css';

const signInSchema = z.object({
  email: z.string().email('emailError'),
  password: z.string().min(1, 'passError'),
});

type SignInFormData = z.infer<typeof signInSchema>;

type AuthProps = {
  mode?: 'signin' | 'signup';
};

function Auth({ mode = 'signin' }: AuthProps) {
  const { t } = useT('auth');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInFormData) => {
    console.log('Form data:', data);
  };

  return (
    <div className={styles.content}>
      <h4 className={styles.title}>{t('title')}</h4>
      <Text className={styles.description}>{t('description')}</Text>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <TextInput
          type="email"
          placeholder="your@email.com"
          label={t('email')}
          {...register('email')}
          error={errors.email?.message ? t(errors.email.message) : undefined}
        />
        <TextInput
          type="password"
          placeholder={t('enterPassword')}
          label={t('password')}
          {...register('password')}
          error={errors.password?.message ? t(errors.password.message) : undefined}
        />
        <Button type="submit" view="action" width="max" disabled={isSubmitting}>
          {isSubmitting ? <Spin size="s" /> : t('signIn')}
        </Button>
      </form>
    </div>
  );
}

export default Auth;
