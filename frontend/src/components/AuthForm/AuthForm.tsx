'use client';

import { Button, Spin, TextInput } from '@gravity-ui/uikit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useT } from 'next-i18next/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './AuthForm.module.css';

const authSchema = z.object({
  email: z.string().email('emailError'),
  password: z.string().min(1, 'passError'),
});

export type AuthFormData = z.infer<typeof authSchema>;

type AuthProps = {
  onSubmit: (data: AuthFormData) => Promise<void>;
  submitLabel: string;
};

function AuthForm({ onSubmit, submitLabel }: AuthProps) {
  const { t } = useT('auth');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  return (
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
        {isSubmitting ? <Spin size="s" /> : submitLabel}
      </Button>
    </form>
  );
}

export default AuthForm;
