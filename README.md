# HarEvent

HarEvent is an event and vendor discovery web app built with React and Vite,
with the NiDi chatbot API served by an Express backend.

## Preview

![HarEvent website preview](./frontend/public/preview.png)

## Features

- Home page with event, vendor category, and location search fields
- Responsive navigation with links to the available sections
- Footer with company, vendor, and contact links
- Fixed WhatsApp-style button that opens the NiDi HarEvent chatbot
- Route scaffolds for the main visitor and vendor pages

## Tech stack

- React
- Vite
- React Router
- Tailwind CSS
- Lucide React and React Icons

## Getting started

Install dependencies:

```bash
cd frontend
npm install
```

Start the frontend on `http://localhost:5173`:

```bash
npm run dev
```

In a second terminal, install backend dependencies and start the API on
`http://localhost:5000`:

```bash
cd backend
npm install
npm run dev
```

The chatbot sends requests to `http://localhost:5000/api/chat` by default. To
use a separately deployed API, set `VITE_CHATBOT_API_URL` in the frontend
environment (for example, `https://your-backend.example.com/api/chat`) before
building the frontend. The frontend website URL is not the chatbot API URL.

The repository root contains the shared `.gitignore`; generated dependencies,
build output, and environment files are ignored there.

## Available scripts

| Command | Description |
| --- | --- |
| `cd frontend && npm run dev` | Start Vite on port 5173 |
| `cd frontend && npm run build` | Create a production build in `frontend/dist/` |
| `cd frontend && npm run preview` | Preview the production build locally |
| `cd frontend && npm run lint` | Run ESLint |
| `cd backend && npm run dev` | Start the API on port 5000 |

## App routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/event-planners` | Event Planners |
| `/event-categories` | Event Categories |
| `/vendor-categories` | Vendor Categories |
| `/blogs` | Blogs |
| `/about` | About |
| `/contact` | Contact |
| `/enquiry` | Enquiry |
| `/login` | Login |
| `/vendor-login` | Vendor Login |
| `/signup` | Sign Up |
| `/favorites` | Favorites |
| `/join-as-vendor` | Join as a Vendor |
| `/search` | Search |

The non-home routes are currently page scaffolds and can be filled in as the app develops.
