> ⚠️ **This project is a work in progress.**
>
> `presha` is currently in early development and not yet production-ready.
> Breaking changes may occur frequently. Feedback and contributions are welcome!

# presha

**A minimal Node.js framework built for clean architecture and low-pressure development.**

> `presha` is the CLI and core engine behind the `presha.js` ecosystem.

## 🚀 Features

- 🧱 Zero boilerplate
Define your data models and business logic — presha generates the rest.

- 🧩 Automatic API & validation CRUD routes and validation from your TypeScript interfaces.

- 📦 Client SDK out of the box. Type-safe API client auto-generated for your frontend.

- 📚 Docs out of the box. OpenAPI/Swagger documentation generated directly from your models. (coming soon)

- 🧠 AI-friendly structure
Minimal code, consistent structure — ideal for code generation and AI pair programming.

- 🧩 Distinction between domain and app layer
Cleanly separates your domain models (models/) from application logic (src/), following clean architecture principles.

## 📦 Installation

Install globally:

```bash
npm install -g presha
```

Or use it locally in your project:

```bash
npm install presha
```

## 📁 Project Structure (example-project)

```bash
📦 example-project/
├── domain/         # TypeScript interfaces (domain layer)
├── app/            # App logic (app layer)
└── package.json
```

## 🛠 CLI Usage
```bash
presha dev     # Start the development server
presha build   # Generate code & prepare for production
presha start   # Run your built app
```
You can also use npm scripts:

```json
{
  "scripts": {
    "dev": "presha dev",
    "build": "presha build",
    "start": "presha start"
  }
}
```


## 🤝 Contributing

Please see the [CONTRIBUTING.md](./../CONTRIBUTING.md) file for guidelines.

