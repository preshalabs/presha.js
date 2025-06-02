import type { User } from '@/domain/user';

/**
 * Minimal registration route.
 *
 * Input is assumed to be pre-validated by the framework using the User domain model.
 * The handler operates only on valid, typed data.
 */
export const route = {
  method: 'POST',
  path: '/auth/register',

  handler: async (ctx: any) => {
    const body = (await ctx.json()) as Partial<User>;

    // Business logic: fake uniqueness check
    const emailAlreadyExists = body.email === 'admin@example.com';
    if (emailAlreadyExists) {
      ctx.res.statusCode = 409;
      return ctx.json({ error: 'Email already registered' });
    }

    // TODO: Save user to database (stubbed here)
    const newUser: User = {
      id: 'generated-id',
      email: body.email!,
      name: body.name ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return ctx.json(newUser);
  }
};
