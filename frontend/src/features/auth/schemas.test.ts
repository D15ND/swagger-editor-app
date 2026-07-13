import { describe, expect, it } from 'vitest';

import { PASSWORD_SPECIAL_CHARS, signInSchema, signUpSchema } from './schemas';

describe('signInSchema', () => {
  it('accepts a valid email and non-empty password', () => {
    const result = signInSchema.safeParse({
      email: 'user@example.com',
      password: 'x',
    });

    expect(result.success).toBe(true);
  });

  it('trims email before validation', () => {
    const result = signInSchema.safeParse({
      email: '  user@example.com  ',
      password: 'x',
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('user@example.com');
    }
  });

  it('rejects an invalid email', () => {
    const result = signInSchema.safeParse({
      email: 'not-an-email',
      password: 'x',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('emailError');
    }
  });

  it('rejects an empty password', () => {
    const result = signInSchema.safeParse({
      email: 'user@example.com',
      password: '',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('passError');
    }
  });
});

describe('signUpSchema', () => {
  const valid = {
    email: 'user@example.com',
    password: 'Password1!',
    confirmPassword: 'Password1!',
  };

  it('accepts a valid payload', () => {
    expect(signUpSchema.safeParse(valid).success).toBe(true);
  });

  it('accepts Unicode letters in the password', () => {
    const result = signUpSchema.safeParse({
      ...valid,
      password: 'Пароль1!',
      confirmPassword: 'Пароль1!',
    });

    expect(result.success).toBe(true);
  });

  it('rejects an invalid email', () => {
    const result = signUpSchema.safeParse({
      ...valid,
      email: 'bad',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('emailError');
    }
  });

  it('rejects a password shorter than 8 characters', () => {
    const result = signUpSchema.safeParse({
      ...valid,
      password: 'Ab1!',
      confirmPassword: 'Ab1!',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('passMinError');
    }
  });

  it('rejects a password without a letter', () => {
    const result = signUpSchema.safeParse({
      ...valid,
      password: '12345678!',
      confirmPassword: '12345678!',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.message === 'passLetterError')).toBe(true);
    }
  });

  it('rejects a password without a digit', () => {
    const result = signUpSchema.safeParse({
      ...valid,
      password: 'Password!',
      confirmPassword: 'Password!',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.message === 'passDigitError')).toBe(true);
    }
  });

  it('rejects a password without a special character', () => {
    const result = signUpSchema.safeParse({
      ...valid,
      password: 'Password1',
      confirmPassword: 'Password1',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.message === 'passSpecialError')).toBe(true);
    }
  });

  it('accepts every character listed in PASSWORD_SPECIAL_CHARS', () => {
    for (const char of PASSWORD_SPECIAL_CHARS) {
      const password = `Password1${char}`;
      const result = signUpSchema.safeParse({
        ...valid,
        password,
        confirmPassword: password,
      });

      expect(result.success, `failed for special char ${JSON.stringify(char)}`).toBe(true);
    }
  });

  it('rejects an empty confirm password', () => {
    const result = signUpSchema.safeParse({
      ...valid,
      confirmPassword: '',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.message === 'confirmPasswordError')).toBe(true);
    }
  });

  it('rejects mismatched confirm password', () => {
    const result = signUpSchema.safeParse({
      ...valid,
      confirmPassword: 'Password1?',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const matchIssue = result.error.issues.find((i) => i.message === 'confirmPasswordMatchError');
      expect(matchIssue?.path).toEqual(['confirmPassword']);
    }
  });
});
