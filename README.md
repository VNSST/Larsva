# Larsva Website 🚀

Welcome to the **Larsva** official website! This project is a modern, high-performance landing page and multi-page web application built with Next.js, React, and Tailwind CSS.

## 🎯 Our Mission
**Larsva — Think It. Ship It. Done. In 14 Days.**
We build MVPs, websites, and mobile apps at lightning speed, taking you from thought to production in just two weeks. No fluff. Just fast shipping.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Fonts**: Space Grotesk & Inter (via `next/font/google`)

---

## 📂 Project Structure

The project follows the standard Next.js App Router architecture:

```text
Larsva/
├── app/                  # Next.js App Router (Pages, Layouts, Global Styles)
│   ├── globals.css       # Tailwind CSS variables and global styles
│   ├── layout.tsx        # Global HTML layout, fonts, Navbar, and Footer
│   ├── page.tsx          # Home Page (Hero, Process, Work, CTA)
│   ├── about/            # About Page
│   ├── contact/          # Contact Page ("Hit Us Up")
│   └── process/          # Process Page ("How It Works")
│
├── components/           # Reusable UI Components
│   ├── common/           # Shared layout components (Navbar.tsx, Footer.tsx)
│   ├── forms/            # Form components (ContactForm.tsx)
│   └── home/             # Home page specific sections (Hero, ProcessSection)
│
├── hooks/                # Custom React hooks (e.g., useMobileMenu.ts)
├── public/               # Static assets (logo.svg, images, etc.)
├── types/                # TypeScript interfaces and type definitions
└── postcss.config.mjs    # PostCSS configuration for Tailwind integration
```

---

## 🔄 Architecture & Flow

### 🎨 Frontend Architecture
The frontend is built for maximum speed and aesthetics, targeting a modern "Gen-Z Tech Startup" vibe:
1. **Routing**: Utilizing Next.js `app/` directory for simple, file-system-based routing.
2. **Layouts**: `app/layout.tsx` wraps all pages, injecting the `Navbar` at the top and `Footer` at the bottom, ensuring consistent branding and navigation.
3. **Styling**: Tailwind CSS is used extensively for utility-first styling. We use custom CSS variables inside `globals.css` (e.g., `--color-accent-purple`) to maintain the vibrant gradient aesthetic.
4. **Interactivity**: Custom hooks like `useMobileMenu` manage UI state (like the responsive hamburger menu). Canvas animations (e.g., floating shapes in the Hero section) are handled directly via React `useEffect` and HTML5 Canvas API.

### ⚙️ Backend & Data Flow
Currently, Larsva operates as a static/client-rendered marketing site.
- **Forms**: User inquiries submitted via `ContactForm.tsx` are designed to integrate with external serverless functions or API endpoints (e.g., Resend, Formspree, or a Next.js API route if added in the future).
- **Static Assets**: Logos and images are served directly from the `public/` directory for fast loading.

---

## 🚀 How to Run Locally

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the site.

4. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```

---

## ✨ Design Philosophy

- **Premium & Minimal**: Utilizing whitespace, bold typography (Space Grotesk), and subtle gradients.
- **Dynamic & Alive**: Micro-interactions, hover effects, and canvas animations keep the user engaged.
- **Conversion-Optimized**: Clear, punchy copy ("Think It. Ship It. Done.") with highly visible Call-to-Actions.
