# Potify ![Status](https://img.shields.io/badge/Status-WIP-orange)

**Live Demo:** [potify.unclepro.site](https://potify.unclepro.site)

A custom-built music streaming app. It uses `yt-dlp` to grab high-quality audio and stream it straight to your browser. No middleman compression, no massive server storage—just a smooth, fast web player that keeps the music going while you click around the site.

## What's Working Right Now
* **Direct Streaming:** Plays raw audio directly to the client. 
* **Global Player:** The music doesn't stop or reload when you switch pages.
* **Google Login:** Secure sign-in using NextAuth.
* **Your Library:** A "Liked Songs" system that saves to a MongoDB database.
* **Snappy UI:** We use Zustand for state management so things like the "Like" button update instantly on your screen without waiting for the database to catch up.
* **Flexible Components:** The UI is built to handle song data whether it comes from an external search API or our own database.

## What's Coming Next
* Custom playlists and queues.
* Shuffle and repeat controls.
* Lyrics integration.

## Built With
* **Frontend:** Next.js (App Router), React, Tailwind CSS
* **Backend:** Next.js API Routes, Node.js, NextAuth.js
* **Database:** MongoDB
* **State Management:** Zustand
* **Audio Engine:** `yt-dlp`

## Project Structure
Organized to keep the API routes secure and the React components easy to reuse.

```text
potify/
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (main)/         # Core App (Search, Library, Liked Pages)
│   │   ├── api/            # Backend (Auth, MongoDB, yt-dlp proxy)
│   │   └── layout.jsx      # Root Layout & Global Providers
│   │
│   ├── components/         # React UI
│   │   ├── layout/         # Sidebar, Navbar
│   │   ├── player/         # Audio Controls, Progress Bar
│   │   └── ui/             # Reusable lists, buttons, cards
│   │
│   ├── lib/                # Shared utilities (MongoDB connection)
│   ├── models/             # Database Schemas
│   ├── services/           # Backend logic (yt-dlp wrappers)
│   └── store/              # Zustand Global State
```

## How to Run It Locally

### Prerequisites
* Node.js
* MongoDB instance (Local or Atlas)
* Python (required for `yt-dlp`)
* `yt-dlp` installed and added to your system's PATH
* Google Cloud Console account (for OAuth credentials)

### Setup Steps
1. Clone the repo:
   ```bash
   git clone [https://github.com/unclepro/potify.git](https://github.com/unclepro/potify.git)
   cd potify
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory and add your keys:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   NEXTAUTH_SECRET=your_generated_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Author
**Aviral Pandey (uncle PRO)**

---
*Note: This project is currently a Work in Progress.*
