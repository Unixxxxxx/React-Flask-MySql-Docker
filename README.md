<div align="center">

# 🛡️ Sudhanshu Kumar — Resume Website

### Full-Stack Resume Web App · React + Vite + TypeScript · Flask REST API

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=flat-square&logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![License](https://img.shields.io/badge/License-MIT-00d9ff?style=flat-square)](LICENSE)

A **modern, dark-themed personal resume website** built with React on the frontend and a Flask REST API on the backend. Fully responsive, animated, and data-driven — all resume content is served dynamically from the API.

---

[🚀 Quick Start](#-quick-start) · [📁 Project Structure](#-project-structure) · [🔌 API Reference](#-api-reference) · [🛠️ Tech Stack](#️-tech-stack) · [📦 Deployment](#-deployment)

</div>

---

## ✨ Features

- **Dark Cyber Theme** — Deep dark background with cyan/green accent colors and terminal-style typography
- **Typewriter Animation** — Hero section cycles through role titles with a blinking cursor
- **Animated Skill Bars** — CSS-only progress bar animations with percentage indicators
- **Rotating Visual Rings** — Decorative hero graphic with orbiting dots using pure CSS keyframes
- **Live Contact Form** — Validates on both frontend (inline errors) and backend (JSON validation), stores messages server-side
- **API-Driven Content** — All resume data fetched from the Flask REST API; update once, reflects everywhere
- **Fully Responsive** — Mobile-first layout with hamburger nav, fluid grids, and adaptive typography
- **Smooth Scrolling** — Single-page layout with anchor navigation and scroll-aware navbar

---

## 📁 Project Structure

```
resume-fullstack/
│
├── 📄 README.md                        ← You are here
│
├── 📂 backend/                         ← Flask REST API
│   ├── 📄 app.py                       ← Main application (routes, data, validation)
│   └── 📄 requirements.txt             ← Python dependencies
│
└── 📂 frontend/                        ← React (Vite + TypeScript)
    ├── 📄 index.html                   ← HTML entry point
    ├── 📄 vite.config.ts               ← Vite + React plugin config
    ├── 📄 tsconfig.json                ← TypeScript compiler options
    ├── 📄 package.json                 ← Node dependencies & npm scripts
    └── 📂 src/
        ├── 📄 main.tsx                 ← ReactDOM bootstrap (mounts <App />)
        ├── 📄 App.tsx                  ← All React components
        ├── 📄 api.ts                   ← Typed API client (fetch wrapper + interfaces)
        └── 📄 Resume.css               ← All styles (variables, animations, responsive)
```

---

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| Python | 3.10+ | [python.org](https://python.org) |
| Node.js | 18+ | [nodejs.org](https://nodejs.org) |
| npm | 9+ | Bundled with Node.js |

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Unixxxxxx/resume-fullstack.git
cd resume-fullstack
```

---

### 2️⃣ Start the Flask Backend

```bash
cd backend

# Create and activate a virtual environment (recommended)
python -m venv venv

# On macOS / Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
python app.py
```

✅ Flask will start at **`http://localhost:5000`**

You should see:
```
🛡️  Sudhanshu Kumar — Resume API
   Running at  http://localhost:5000
   Health check http://localhost:5000/api/health
```

---

### 3️⃣ Start the React Frontend

Open a **new terminal window**:

```bash
cd frontend

# Install Node dependencies
npm install

# Start the development server
npm run dev
```

✅ React will start at **`http://localhost:5173`**

> **Both servers must be running at the same time.** The frontend fetches data from the backend on port 5000.

---

## 🔌 API Reference

Base URL: `http://localhost:5000/api`

### Resume Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check — returns server status & timestamp |
| `GET` | `/resume` | Full resume data in a single response |
| `GET` | `/hero` | Hero section (name, roles, bio, availability) |
| `GET` | `/about` | About section (paragraphs, tags, info) |
| `GET` | `/skills` | All skills with name, category, level, icon |
| `GET` | `/skills?category=SIEM` | Filter skills by category |
| `GET` | `/projects` | All projects |
| `GET` | `/projects/:id` | Single project by ID |
| `GET` | `/experience` | Work experience entries |
| `GET` | `/education` | Education history |

### Contact Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/contact` | Submit a contact form message |
| `GET` | `/messages` | View all received messages (admin) |

---

### POST `/api/contact`

**Request body (JSON):**

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "SOC Analyst Role",
  "message": "Hi Sudhanshu, I'd love to discuss an opportunity with you."
}
```

**Success response `201`:**

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "message": "Message received! I'll get back to you soon."
  }
}
```

**Validation error `400`:**

```json
{
  "status": "error",
  "message": "Invalid email address"
}
```

**Validation rules:**
- `name` — required, minimum 2 characters
- `email` — required, must match valid email format
- `subject` — optional (defaults to "No subject")
- `message` — required, minimum 10 characters

---

### Example API Responses

**`GET /api/skills`**
```json
{
  "status": "success",
  "data": [
    { "name": "ELK Stack", "category": "SIEM", "level": 85, "icon": "📊" },
    { "name": "Linux",     "category": "OS",   "level": 90, "icon": "🐧" }
  ]
}
```

**`GET /api/health`**
```json
{
  "status": "success",
  "data": {
    "status": "healthy",
    "timestamp": "2024-03-02T10:30:00Z",
    "version": "1.0.0"
  }
}
```

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 18** | UI component framework |
| **TypeScript** | Type safety and IDE support |
| **Vite** | Lightning-fast dev server and bundler |
| **Pure CSS** | Styling — no Tailwind or Bootstrap |
| **Syne** | Display / heading font |
| **JetBrains Mono** | Terminal / monospace font |
| **DM Sans** | Body text font |

### Backend

| Technology | Purpose |
|------------|---------|
| **Flask 3** | REST API framework |
| **Flask-CORS** | Cross-origin request handling |
| **Python 3.10+** | Backend runtime |

### Design

| Feature | Implementation |
|---------|----------------|
| Dark theme | CSS custom properties (`--bg`, `--accent`, etc.) |
| Animations | CSS `@keyframes` only — no JS animation libraries |
| Typewriter effect | React `useState` + `useEffect` + `setTimeout` |
| Skill bars | CSS `animation: fillBar` with `--level` custom property |
| Responsive layout | CSS Grid + Flexbox + `@media` breakpoints |

---

## 🧩 Component Architecture

```
App
├── Navbar              — Fixed nav with scroll detection & mobile hamburger
├── Hero                — Typewriter + animated hex rings + stats
├── About               — Bio paragraphs + sticky info card
├── Skills              — Animated skill card grid
├── Projects            — Project cards with GitHub links
├── Experience          — Vertical timeline
├── Education           — Education card
├── Contact             — Info cards + live contact form with validation
└── Footer              — Credits bar

api.ts                  — Centralised typed fetch client
                          (get<T> / post<T> helpers + all TypeScript interfaces)
```

---

## 📦 Deployment

### Build the Frontend

```bash
cd frontend
npm run build
# Output: frontend/dist/
```

### Serve with Flask (Optional)

You can serve the built frontend directly from Flask:

```python
# In app.py — add after imports
from flask import send_from_directory

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    if path and os.path.exists(os.path.join("../frontend/dist", path)):
        return send_from_directory("../frontend/dist", path)
    return send_from_directory("../frontend/dist", "index.html")
```

### Deploy to the Cloud

| Platform | Frontend | Backend |
|----------|----------|---------|
| **Vercel** | `cd frontend && vercel` | — |
| **Netlify** | Drag & drop `dist/` | — |
| **Render** | Static site from `dist/` | Web service from `backend/` |
| **Railway** | — | Deploy `backend/` directly |

> **Important:** Update the `BASE` URL in `frontend/src/api.ts` to your deployed backend URL before building for production.

```ts
// frontend/src/api.ts
const BASE = "https://your-backend.onrender.com/api";  // ← change this
```

---

## 🔧 Configuration

### Change Resume Data

All resume content lives in `backend/app.py` inside the `RESUME_DATA` dictionary. Edit it directly — no database required for a personal site.

```python
# backend/app.py
RESUME_DATA = {
    "hero": {
        "name": "Your Name",
        "roles": ["Your Role 1", "Your Role 2"],
        "bio": "Your short bio here.",
        "available": True,
    },
    "skills": [
        { "name": "Your Skill", "category": "Category", "level": 80, "icon": "🔧" },
    ],
    # ... and so on
}
```

### Environment & CORS

By default, CORS allows `localhost:5173` and `localhost:3000`. Update for production:

```python
# backend/app.py
CORS(app, origins=["https://your-frontend-domain.com"])
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute it for personal or commercial purposes.

---

<div align="center">

**Built with 🛡️ by [Sudhanshu Kumar](https://github.com/Unixxxxxx)**

*Cyber Security Analyst · SOC Enthusiast · Chandigarh University, 2023*

</div>
