# Domain Layer (`/src/domain`)

The domain layer defines the core models of your application using plain TypeScript interfaces. These are the source of truth for your business entities.

## Required*

Each model must be defined as a TypeScript interface.

## Optional Hooks

Each domain model can export lifecycle hooks:

```ts
export const userHooks = {
  beforeCreate: async (data) => {},
  afterCreate: async (entity) => {},
  // ...other hooks
}
```

## Optional Configuration

```ts
export const flowerConfig = {
  exposed: true,         // Whether to generate API routes, default true
  authRequired: true     // Whether to wrap routes with auth middleware, default false
}
```

## Relations

You can reference other domain models directly:

```ts
export interface UserFlower {
  user: User;           // Will be treated as `user_id` in DB
  flower: Flower;       // Will be treated as `flower_id` in DB
}
```