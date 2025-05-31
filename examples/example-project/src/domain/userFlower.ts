import type { User } from './user';
import type { Flower } from './flower';

/**
 * This interface defines the structure of the `UserFlower` entity.
 *
 * It represents a many-to-many relationship between users and flowers,
 * and includes full `User` and `Flower` references.
 *
 * 🔁 These references will be:
 * - Represented in the **code** as typed objects (`User`, `Flower`)
 * - Represented in the **database** as foreign keys:
 *     - `user` ➝ `user_id` (FK to `users.id`)
 *     - `flower` ➝ `flower_id` (FK to `flowers.id`)
 *
 * This approach enables:
 * - Type-safe nested access in code
 * - Proper foreign key mapping in DB
 * - Easy generation of joins and includes in repositories/services
 *
 * 🧩 This model is not exposed via API routes (`exposed: false`)
 */
export interface UserFlower {
  id: string;
  user: User;
  flower: Flower;
  favoritedAt: Date;
}

/**
 * Model configuration for `UserFlower`
 *
 * - `exposed: false` → skip route/controller generation
 * - `authRequired: true` → usage assumes authenticated access
 */
export const userFlowerConfig = {
  exposed: false,
  authRequired: true
};
