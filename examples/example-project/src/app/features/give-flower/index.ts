import type { User } from '@/domain/user';
import type { Flower } from '@/domain/flower';

/**
 * Feature route: Give a flower to another user.
 *
 * - Input is pre-validated by the framework.
 * - Current user is assumed to be available via `ctx.user`.
 */
export const route = {
  method: 'POST',
  path: '/flowers/give',

  handler: async (ctx: any) => {
    const body = (await ctx.json()) as {
      toUserId: string;
      flowerId: string;
    };

    const currentUser = ctx.user as User;

    // Business logic (stub)
    const flower: Flower = {
      id: body.flowerId,
      name: 'Rose',
      price: 5,
      available: true,
      createdAt: new Date()
    };

    // TODO: Persist user-flower relation
    const userFlower = {
      id: 'new-user-flower-id',
      user: currentUser,
      flower,
      favoritedAt: new Date()
    };

    return ctx.json({
      message: `${currentUser.email} sent a ${flower.name} to user ${body.toUserId}`,
      data: userFlower
    });
  }
};
