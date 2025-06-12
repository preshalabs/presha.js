import type { User } from '@/domain/user';
import type { RequestHandler } from 'presha/runtime/express';

/**
 * Minimal registration route.
 *
 * Input is assumed to be pre-validated by the framework using the User domain model.
 * The handler operates only on valid, typed data.
 */
export const route = {
  method: 'POST',
  path: '/auth/register',

  handler: (async (req, res) => {
    const body = req.body as Partial<User>;

    // Business logic: fake uniqueness check
    const emailAlreadyExists = body.email === 'admin@example.com';
    if (emailAlreadyExists) {
      res.statusCode = 409;
      res.json({ error: 'Email already registered' });
      return;
    }

    // TODO: Save user to database (stubbed here)
    const newUser: User = {
      id: 'generated-id',
      email: body.email!,
      name: body.name,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    res.json(newUser);
  }) as RequestHandler
};
