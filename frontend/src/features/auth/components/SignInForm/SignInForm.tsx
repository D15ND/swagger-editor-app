'use client';

import { Button, Spin, TextInput, PasswordInput } from '@gravity-ui/uikit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useT } from 'next-i18next/client';
import { useForm } from 'react-hook-form';
import { signInSchema, type SignInFormData } from '@/features/auth/schemas';
import styles from './SignInForm.module.css';

type SignInFormProps = {
  onSubmit: (data: SignInFormData) => Promise<void>;
};

function SignInForm({ onSubmit }: SignInFormProps) {
  const { t } = useT('auth');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextInput
        type="email"
        placeholder={t('emailPlaceholder')}
        label={t('email')}
        {...register('email')}
        error={errors.email?.message ? t(errors.email.message) : undefined}
      />
      <PasswordInput
        placeholder={t('enterPassword')}
        label={t('password')}
        {...register('password')}
        error={errors.password?.message ? t(errors.password.message) : undefined}
      />
      <Button type="submit" view="action" width="max" disabled={isSubmitting}>
        {isSubmitting ? <Spin size="s" /> : t('signin.submit')}
      </Button>
    </form>
  );
}

export default SignInForm;
