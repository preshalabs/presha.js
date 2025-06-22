import type { RequestHandler } from 'presha/runtime/express';

interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Minimal login route.
 *
 * Input is assumed to be validated against the User model.
 */
export const route = {
  method: 'POST',
  path: '/auth/login',

  handler: (async (req, res) => {
    const body = req.body as LoginRequest;

    // Business logic: fake login check
    if (body.email === 'admin@example.com' && body.password === 'password123') {
      res.json({ token: 'mock-jwt-token' });
      return;
    }

    res.statusCode = 401;
    res.json({ error: 'Invalid credentials' });
  }) as RequestHandler
};
