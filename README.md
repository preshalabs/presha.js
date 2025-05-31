> 🚧 **Work in Progress**  
> Presha.js is in early development and subject to change. 
> That said — feel free to explore, open issues, or even submit PRs! We'd love to hear what you think.

# Presha.js
> Presha is no pressure.

Presha is a TypeScript-based backend framework that turns interfaces into fully functional REST APIs, validation schemas, and database models. It minimizes boilerplate by using interfaces as the single source of truth, enabling fast, scalable, and type-safe API development.

## 💻 How to use? 

1. `npm install` preshajs
2. `preshajs init`               ⟶ generates config + base dirs
3. `preshajs dev`                ⟶ watches for interface changes, hot-generates code
4. define interfaces         ⟶ in `models/`
5. `preshajs generate`           ⟶ regenerates API, Zod, DB models
6. `preshajs start`              ⟶ boots up server
7. access `/api/users`, etc.

## ⚡ Performance & Scalability
- Use static generation (not runtime reflection)
- Hot reloading via file watchers (chokidar)
- Only regenerate changed files
- CLI commands separate from runtime logic (for clean DX)

## 🧱 Presha High-Level Architecture

```
📦 presha.js/
├── cli/                 # CLI entry point and commands
├── core/                # Core logic for parsing, generating, and managing modules
│   ├── parser/          # ts-morph-based interface parser
│   ├── generator/       # Generates zod, API routes, db models
│   ├── runtime/         # Request handling, validation, routing
│   ├── db/              # Abstract DB layer (Prisma, Drizzle)
│   └── utils/           # Shared helpers
├── templates/           # Jinja-style or string templates for generated code
├── server/              # Express/Hono/Fastify core server runner
├── sdk/                 # Client SDK generator (future)
├── docs/                # Swagger/OpenAPI auto-generator (future)
├── tests/               # Test auto-generator (future)
├── examples/            # Example Presha projects
└── index.ts             # Entrypoint for library users
```

### ✅ Modular Layers (Separation of Concerns)

#### 1. CLI Layer (cli/)
    - Handles presha init, presha dev, presha generate
    - Guides user through setup (DB, paths, etc.)
    - Uses commander, enquirer, or prompts

#### 2. Interface Parser (core/parser)
    - Uses ts-morph to extract interfaces
    - Outputs normalized metadata like:
```ts
{
  name: 'User',
  fields: [{ name: 'id', type: 'number' }, ...]
}
```

#### 3. Code Generator (core/generator)
    - Takes interface metadata
    - Generates:
        - Zod schema
        - API handler (CRUD)
        - DB model (Prisma/Drizzle/SQL)
        - Optional: OpenAPI schema, tests, SDK hooks

#### 4. Runtime Engine (core/runtime)
    - Auto-registers routes from generated files
    - Validates requests using Zod
    - Connects to DB client

#### 5. Database Layer (core/db)
- Abstracts DB access
- Uses adapters (Prisma now, later support Drizzle, raw SQL)
- Handles model generation and migration

## 🔮 Future Extensions

| Feature  | Description                                 | Modular Location       |
| -------- | ------------------------------------------- | ---------------------- |
| 📘 Docs  | Swagger/OpenAPI docs from Zod + Metadata    | `core/docs`            |
| 🧪 Tests | Auto-generated Jest tests for models/routes | `core/testgen`         |
| 🔧 SDK   | Client SDK (e.g. `useUsers()` React hooks)  | `sdk/`                 |
| 🌐 UI    | Admin UI generator (like Supabase/Refine)   | `ui/` (optional later) |

