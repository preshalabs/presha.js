# 🧪 Examples

This folder contains example projects built using **presha.js**.  

These examples are used to validate framework functionality, guide development, and demonstrate real-world usage.

---

## 🎯 Project Goal

The primary goal of the `examples/` folder is to drive the development of `presha.js` by building and iterating on a single reference project: `example-project`.

`example-project` serves as the **cornerstone** of the framework — every feature in `presha.js` is validated against it.

✅ The **first beta release** of `presha.js` will be considered complete once `example-project` runs successfully and demonstrates the core functionality of the framework.

---

## 📁 Current Structure

```bash
examples/
└── example-project/     # The canonical app powered by presha.js
```


## 🛠 Usage
Navigate into the example project:

```bash
cd examples/example-project
npm i
npm run dev
```

## 📚 Example Features (Planned)

The example will gradually evolve to include:

- 🛠 Route registration (GET /hello)
- 🛠 Minimal runtime handler
- 🛠 Input/output validation via Zod
- 🛠 Type-safe domain modeling
- 🛠 Automatic API docs
- 🛠 SDK generation

## 🧱 Architecture Principles
- Minimal: no-boilerplate, readable structure
- Modular: Clean separation between domain, app, and infrastructure
- AI-friendly: Code is structured for ease of automation and generation
- Scalable: Each piece of logic is testable and swappable

> Stay focused on making example-project work — everything else builds from there.
