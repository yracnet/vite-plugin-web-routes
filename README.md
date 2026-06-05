# Isolated Architecture

The isolated architecture uses filesystem conventions to define self-contained routing modules. Each directory describes its own behavior through semantic files, eliminating centralized route registration.

## Principles

* Routes are discovered from the filesystem.
* Each semantic file has a single responsibility.
* Registration order is deterministic.
* A module is defined by its directory structure.
* No manual route configuration is required.

---

## API Modules

Example:

```txt
api-dir/
├── USE.js
├── AUTH.js
├── user/
│   ├── GET.js
│   └── POST.js
└── ERROR.js
```

Generated registration:

```js
app.use("/", USE)
app.use("/", AUTH)

app.get("/user", GET)
app.post("/user", POST)

app.use("/", ERROR)
```

### Semantic Files

| File        | Purpose                                   |
| ----------- | ----------------------------------------- |
| `USE.js`    | Middleware executed before routes         |
| `AUTH.js`   | Authentication / authorization middleware |
| `GET.js`    | GET endpoint                              |
| `POST.js`   | POST endpoint                             |
| `PUT.js`    | PUT endpoint                              |
| `PATCH.js`  | PATCH endpoint                            |
| `DELETE.js` | DELETE endpoint                           |
| `ERROR.js`  | Error handling middleware                 |

---

## Web Modules

Example:

```txt
web-dir/
├── LAYOUT.jsx
├── AUTH.jsx
├── ERROR.jsx
└── home/
    ├── PAGE.jsx
    └── about/
        └── PAGE.jsx
```

Generated routes:

```txt
/home
/home/about
```

### Semantic Files

| File         | Purpose                |
| ------------ | ---------------------- |
| `LAYOUT.jsx` | Route group wrapper    |
| `AUTH.jsx`   | Route protection layer |
| `PAGE.jsx`   | Route component        |
| `ERROR.jsx`  | Route error boundary   |

---

## Design Goal

Each directory acts as an isolated module that fully describes its own routing behavior through conventions rather than configuration.
