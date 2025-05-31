# Philosophy
Presha encourages clear separation of responsibilities by dividing the project into two main layers:

## 🔹 Domain Layer (`/src/domain`)

Defines the what: the structure of your business entities, their relationships, and rules. This layer is pure, declarative, and contains no runtime behavior.

In presha.js, the domain layer can also drive API generation automatically. Based on your model:

- A basic set of CRUD endpoints will be scaffolded.
- Input/output will be validated using the model's structure.
- Lifecycle hooks can intercept operations for validation, logging, or mutation.
- Configuration can control visibility (exposed), protection (authRequired), and behavior.

## 🔹 App Layer (`/src/app`)

Defines the how: how the application uses those entities to fulfill specific business needs. This layer contains all the route handlers, feature logic, and orchestration.

This distinction makes the project easier to reason about, more testable, and ideal for automation and generation.
