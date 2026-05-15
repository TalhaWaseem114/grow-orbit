# Grow Orbit - Amazon Growth Engine

Grow Orbit is a premium, high-conversion web application designed for an Amazon scaling agency. Built with Next.js 15, it features the **Orbit Protocol** design system—a sophisticated, dark-themed interface optimized for visual rhythm, tactile interactions, and conversion authority.

## 🚀 Key Features

- **Orbit Protocol Design System:** A curated zinc/orange palette with monospaced metadata and premium typographic hierarchies.
- **Dynamic Theming Engine:** A Firestore-backed admin dashboard that allows real-time switching between multiple landing page themes (A/B testing ready).
- **Service Catalog:** 20+ specialized service pages for Amazon Management, Design, and Strategy, each optimized for conversion.
- **Admin Command Center:** A private dashboard for lead management, user role control, and site layout configuration.
- **Pixel-Perfect Responsiveness:** Optimized for all viewports with custom mobile-first navigation and layout adjustments.
- **Performance Optimized:** Static page generation (SSG) for lightning-fast load times.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** Tailwind CSS
- **Animations:** GSAP & CSS Keyframes
- **Database/Auth:** Firebase (Firestore & Firebase Auth)
- **Icons:** Lucide React

## 📥 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TalhaWaseem114/grow-orbit.git
   cd grow-orbit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory and add your Firebase credentials (do not commit this file to Git):
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## 🔐 Security Note

This repository **does not** contain sensitive environment variables or Firebase keys. All configuration is handled through local `.env` files which are excluded from version control via `.gitignore`.

## 📄 License

© 2010–2026 Grow Orbit Inc. All rights reserved.
