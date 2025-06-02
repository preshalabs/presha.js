/**
 * This interface defines the structure of the `User` entity.
 *
 * 🧩 This is a **required** part of the domain layer.
 * The `presha.js` framework uses this interface as the source of truth to auto-generate:
 * - Zod validation schemas
 * - Database models (Prisma, Drizzle)
 * - Repositories
 * - Services
 * - Controllers
 * - Routes
 *
 * 🚨 Do not rename this interface or move it outside of the `domain/` folder,
 * or it may not be picked up by the framework's parser.
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Optional lifecycle hooks for the User model.
 *
 * These hooks allow you to insert logic before/after core actions like create, update, delete, or read.
 * You can use them for validation, logging, authorization checks, etc.
 *
 * If omitted, the framework will simply skip hook execution.
 */
export const hooks = {
  beforeCreate: async (data: Partial<User>) => {
    if (!data.email?.includes('@')) {
      throw new Error('Invalid email');
    }
    console.log('[User.beforeCreate]', data);
  },

  afterCreate: async (user: User) => {
    console.log('[User.afterCreate]', user.id);
  },

  beforeUpdate: async (data: Partial<User>) => {
    console.log('[User.beforeUpdate]', data);
  },

  afterUpdate: async (user: User) => {
    console.log('[User.afterUpdate]', user.id);
  },

  beforeDelete: async (id: string) => {
    console.log('[User.beforeDelete]', id);
  },

  afterDelete: async (id: string) => {
    console.log('[User.afterDelete]', id);
  },

  beforeRead: async (id: string) => {
    console.log('[User.beforeRead]', id);
  },

  afterRead: async (user: User | null) => {
    console.log('[User.afterRead]', user?.id ?? 'not found');
  }
};
