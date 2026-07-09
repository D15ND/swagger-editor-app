'use client';

import { Button, Spin, TextInput } from '@gravity-ui/uikit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useT } from 'next-i18next/client';
import { useForm } from 'react-hook-form';
import { signUpSchema, type SignUpFormData } from '@/features/auth/schemas';
import styles from './SignUpForm.module.css';

type SignUpFormProps = {
  onSubmit: (data: SignUpFormData) => Promise<void>;
};

function SignUpForm({ onSubmit }: SignUpFormProps) {
  const { t } = useT('auth');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
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
      <TextInput
        type="password"
        placeholder={t('enterPassword')}
        label={t('password')}
        {...register('password')}
        error={errors.password?.message ? t(errors.password.message) : undefined}
      />
      <TextInput
        type="password"
        placeholder={t('confirmPasswordPlaceholder')}
        label={t('confirmPassword')}
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message ? t(errors.confirmPassword.message) : undefined}
      />
      <Button type="submit" view="action" width="max" disabled={isSubmitting}>
        {isSubmitting ? <Spin size="s" /> : t('signup.submit')}
      </Button>
    </form>
  );
}

export default SignUpForm;
