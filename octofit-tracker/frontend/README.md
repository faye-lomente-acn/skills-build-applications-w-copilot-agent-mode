# OctoFit Tracker Frontend

This React 19 + Vite app is the presentation tier for OctoFit Tracker.

## Environment Variable

Define VITE_CODESPACE_NAME for Codespaces API routing.

Example .env.local:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When this variable is set, API calls are built as:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When it is unset, the app safely falls back to:

```text
http://localhost:8000/api/[component]/
```

## Scripts

- npm run dev
- npm run build
- npm run preview
