import type { User } from '@/domain/user';

/**
 * Minimal login route.
 *
 * Input is assumed to be validated against the User model.
 */
export const route = {
  method: 'POST',
  path: '/auth/login',

  handler: async (ctx: any) => {
    const body = (await ctx.json()) as Partial<User>;

    // Business logic: fake login check
    if (body.email === 'admin@example.com' && body.password === 'password123') {
      return ctx.json({ token: 'mock-jwt-token' });
    }

    ctx.res.statusCode = 401;
    return ctx.json({ error: 'Invalid credentials' });
  }
};
