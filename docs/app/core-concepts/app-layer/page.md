# Application Layer (`/src/app`)

The application layer represents the behavior and use cases of your system. It consumes domain models to create meaningful workflows, and is where your business logic lives.

Unlike the domain layer (which defines what your system is), the app layer defines how your system behaves and interacts with users and services

## Core Responsibilities

- Compose features using domain models
- Define custom routes and handlers (e.g. login, register, send flower)
- Orchestrate service calls and enforce business logic
- Handle authenticated user context (ctx.user) and side effects

## App Layer is:
- Imperative and executable
- Feature- and use-case-driven
- it's where your creativity and rules live

This separation ensures the app layer remains flexible while keeping domain logic stable and declarative.

The app layer contains your route and feature logic. Unlike the domain, this layer defines actual behavior and business use cases.


## 📁 `app/`

Top-level directory for route modules and domain-specific use cases.

## 📁 `app/auth/`

This folder contains routes related to authentication (e.g., login, register). Input is assumed to be validated by the framework based on the User domain model.

```ts
export const route = {
  method: 'POST',
  path: '/auth/login',
  handler: async (ctx) => {
    const body = await ctx.json();
    // Business logic only
    return ctx.json({ token: 'mock-token' });
  }
};
```

## 📁 `app/features/`

This is where you define use-case-specific features that do not fit standard CRUD routes. These are more expressive and custom.

export const route = {
  method: 'POST',
  path: '/flowers/give',
  handler: async (ctx) => {
    const body = await ctx.json();
    const user = ctx.user;
    // Handle business logic
    return ctx.json({ message: 'Flower sent!' });
  }
};