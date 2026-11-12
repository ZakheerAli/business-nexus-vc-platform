# 🚀 Business Nexus — Startup Fundraising & Venture Capital Platform

Welcome to **Business Nexus**! A modern, full-stack web application designed to connect ambitious startup founders with venture capital investors.

The platform provides institutional-grade fundraising tools, including an **interactive SAFE cap table calculator**, **watermarked confidential data rooms**, a **bilingual system (English & Roman Urdu)**, and an **animated AI Venture Co-Pilot** powered by Google Gemini.

---

## 🌐 Live Demo & Preview

- **Live URL:** [Business Nexus Live Preview](https://business-nexus-vc-platform.vercel.app/)
- **Deployment Ready:** Configured for one-click deployment on **Vercel**.
- **Vercel AI setup:** Add `GEMINI_API_KEY` in the project's Vercel Environment Variables, enable it for the Production environment, then redeploy. Keep the key server-side; do not use a `VITE_` prefix.

---

## ✨ Key Features (What can you do with this app?)

### 1. 💼 Two Realistic User Dashboards (Dual Personas)
You can test the entire platform without signing up:
- **Investor Mode (Victoria Sterling):** View curated startup deals, review pitch decks, inspect data rooms, and syndicate investments.
- **Founder Mode (Marcus Chen):** Manage fundraising rounds, monitor investor traction, and view cap table dilution.

### 2. 🧮 Interactive SAFE Equity & Dilution Calculator
- Calculate startup equity using standard **Y-Combinator & NVCA Post-Money SAFE** formulas.
- Drag sliders for **Investment Amount**, **Valuation Cap**, and **Founder Ownership**.
- See real-time percentage breakdowns (Founders %, New Investors %, Employee Pool %).

### 3. 🔒 Secure Data Room Vaults
- View confidential pitch decks and financial spreadsheets.
- **Dynamic Watermarking:** Every document displays the viewer's email and timestamp to prevent unauthorized sharing.
- Instant Founder Killswitch to revoke access at any time.

### 4. 🤖 Nexus AI Venture Co-Pilot (Animated Chatbot)
- Floating AI assistant powered by **Google Gemini 3.8 Flash**.
- Understands startup valuations, SAFE notes, and investment terms.
- Works in both **English and Roman Urdu**.
- Built-in intelligent fallback engine so it works smoothly even without an API key!

### 5. 🌐 1-Click Bilingual Language Switcher
- Switch between **English** and **Roman Urdu** with a single click in the header (`🌐 EN | Roman Urdu`).
- Helps both global English speakers and Urdu/Hindi speakers understand the platform with ease.

### 6. 🎨 Cyber-Velvet & Liquid Aurum Theme
- Premium visual aesthetic featuring Deep Velvet Obsidian (`#04060C`), 24K Liquid Aurum Gold, and Jade Emerald accents.
- Smooth animations powered by **Framer Motion**.

### 7. ⚡ Quick Command Palette (`Ctrl + K` or `Cmd + K`)
- Press `Ctrl + K` on your keyboard anywhere on the website to quickly search startups, open diligence rooms, or switch views.

---

## 🛠️ Built With (Tech Stack)

| Category | Technology |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite 8 |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion (`motion/react`) |
| **Icons** | Lucide React |
| **Routing** | React Router DOM v7 |
| **AI Models** | Gemini 3.8 Flash with automatic fallbacks to Gemini Flash Latest and Gemini 3.1 Flash Lite (`@google/genai`) |
| **Backend & API** | Node.js, Express, Vercel Serverless Functions (`/api/chat.ts`) |

---

## 📁 Project Folder Structure

```text
business-nexus/
├── api/
│   └── chat.ts             # Vercel Serverless Function for AI Chatbot
├── public/
│   ├── assets/             # Sample documents and pitch decks
│   └── business-nexus.zip  # Downloadable codebase archive
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ai/             # Nexus AI Chatbot widget
│   │   ├── common/         # Command palette, tickers, navigation
│   │   ├── dataroom/       # Watermarked document viewer
│   │   ├── dilution/       # SAFE equity calculator
│   │   └── ui/             # Buttons, cards, modals
│   ├── context/            # Global application state (AppContext)
│   ├── data/               # Startup & investor mock dealflow data
│   ├── i18n/               # English & Roman Urdu translations
│   ├── pages/              # Landing page, Dashboards, Profiles
│   ├── App.tsx             # Main routing and layout wrapper
│   └── main.tsx            # React application entry point
├── .env.example            # Sample environment variables
├── .gitignore              # Files ignored by Git (protects secrets)
├── package.json            # Project dependencies and npm scripts
├── README.md               # This project documentation
├── server.ts               # Local development Node.js Express server
├── vercel.json             # Vercel routing configuration (SPA + Serverless)
└── vite.config.ts          # Vite configuration
