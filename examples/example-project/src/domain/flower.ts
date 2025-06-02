/**
 * This interface defines the structure of the `Flower` entity.
 *
 * 🧩 This is a **required** domain model for presha.js code generation.
 *
 * The framework will generate:
 * - Zod schema
 * - CRUD routes (if `exposed: true`)
 * - Repository/service/controller layers
 *
 * 📌 This model includes configuration flags instead of lifecycle hooks.
 */
export interface Flower {
  id: string;
  name: string;
  price: number;
  description?: string;
  available: boolean;
  createdAt: Date;
}

/**
 * Optional model-level configuration for the framework.
 *
 * - `exposed`: if false, the model is internal and no routes will be generated
 * - `authRequired`: if true, routes will be protected by auth middleware
 */
export const config = {
  exposed: true,
  authRequired: true
};
