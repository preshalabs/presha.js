/**
 * This class defines the structure of the `User` entity.
 *
 * 🧩 This is a **required** part of the domain layer.
 * The `presha.js` framework uses this class as the source of truth to auto-generate:
 * - Database models (Prisma, Drizzle)
 * - Repositories
 * - Services
 * - Controllers
 *
 */

import { DrizzleModel, PreshaKit } from 'presha';

// TODO: Try to auto-generate this interface from the DrizzleModel, so we don't have to manually define it.
export interface UserModel {
  id: string;
  email: string;
  createdAt: Date;
}

const userModel = new DrizzleModel({
  name: 'User',
  fields: {
    id: { type: 'uuid', primary: true },
    email: { type: 'string', unique: true },
    createdAt: { type: 'timestamp' }
  }
});

export class User extends PreshaKit<UserModel> {
  constructor() {
    super(userModel);
  }

  /**
   * Optional lifecycle hooks for the User model.
   *
   * These hooks allow you to insert logic before/after core actions like create, update, delete, or read.
   * You can use them for validation, logging, authorization checks, etc.
   *
   * If omitted, the framework will simply skip hook execution.
   */
  // TODO: add support for hooks
  // optional
  //   protected async beforeCreate(data: Partial<UserModel>) {
  //     console.log('🔍 Validating user before create:', data.email);
  //     if (!data.email?.includes('@')) {
  //       throw new Error('Invalid email');
  //     }
  //     return data;
  //   }

  // optional
  //   protected async afterCreate(user: UserModel) {
  //     console.log('✅ Created user:', user.id);
  //   }
}
