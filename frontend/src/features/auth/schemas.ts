import { z } from 'zod';

/**
 * Must match the character list in auth.json `passSpecialError` (en/ru).
 * Kept as a single source so the regex and user-facing copy stay in sync.
 */
export const PASSWORD_SPECIAL_CHARS = "!@#$%^&*()-_=+[]{}|;:',.<>?/`~";

const passwordSpecialRegex = new RegExp(`[${PASSWORD_SPECIAL_CHARS.replace(/[\\\]^-]/g, '\\$&')}]`);

export const signInSchema = z.object({
  email: z.string().trim().email('emailError'),
  password: z.string().min(1, 'passError'),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    email: z.string().trim().email('emailError'),
    password: z
      .string()
      .min(8, 'passMinError')
      .regex(/[\p{L}]/u, 'passLetterError')
      .regex(/\d/, 'passDigitError')
      .regex(passwordSpecialRegex, 'passSpecialError'),
    confirmPassword: z.string().min(1, 'confirmPasswordError'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'confirmPasswordMatchError',
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
