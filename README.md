# Potify ![Status](https://img.shields.io/badge/Status-WIP-orange)

**Live Demo:** [potify.unclepro.site](https://potify.unclepro.site)

A high-quality, lightweight music streaming platform built from scratch. Potify leverages `yt-dlp` to deliver instantaneous, zero-transcoding Opus audio streams (160 kbps, Format 251) directly to a persistent web player, offering an audio experience that competes with premium streaming services.

## Features

**Implemented**
* **High-Fidelity Audio:** Streams raw `.webm` Opus audio directly to the client without lossy MP3 transcoding.
* **Persistent Playback:** Global audio player UI that continues playing seamlessly while navigating across different pages.
* **Authentication:** Secure OAuth integration using NextAuth.js (Google Provider) with MongoDB sessions.
* **User Library:** "Liked Songs" functionality with persistent database storage.
* **Optimistic UI:** Advanced state management using Zustand. Utilizes a Dictionary pattern for O(1) lookups, ensuring instant, lag-free UI updates across all components when interacting with tracks.
* **Polymorphic Components:** Highly reusable UI architecture capable of normalizing data shapes from both external search APIs and internal database schemas.
* **On-the-fly Streaming:** No massive server storage required; audio is proxied directly via Next.js backend services.

**Planned**
* Custom playlists and queue management.
* Advanced media controls (shuffle, repeat).
* Full lyrics integration.

## Tech Stack
* **Frontend:** Next.js (App Router), React, Tailwind CSS
* **Backend:** Next.js API Routes, Node.js `child_process`, NextAuth.js
* **Database:** MongoDB & Native Node Driver
* **State Management:** Zustand
* **Audio Engine:** `yt-dlp`

## Project Structure
Built with a strict separation of concerns to keep API routes secure and React components modular.

```text
potify/
├── src/
│   ├── app/                # Next.js App Router (Pages & API)
│   │   ├── (main)/         # Route Group: Core App (Persistent Audio Player)
│   │   │   ├── search/
│   │   │   ├── library/
│   │   │   └── liked/
│   │   ├── api/            # Backend API Endpoints
│   │   │   ├── auth/       # NextAuth.js configuration routes
│   │   │   ├── like/       # MongoDB read/write for user library
│   │   │   ├── stream/     # yt-dlp audio proxy
│   │   │   └── search/     # YouTube metadata queries
│   │   └── layout.jsx      # Root Layout & Session Providers
│   │
│   ├── components/         # React UI Building Blocks
│   │   ├── layout/         # Sidebar, Navbar
│   │   ├── player/         # AudioPlayer, ProgressBar, Volume
│   │   └── ui/             # Reusable lists (SongList), buttons, cards
│   │
│   ├── lib/                # Shared utilities (MongoDB clientPromise)
│   ├── models/             # Mongoose Database Schemas
│   ├── services/           # Backend logic (yt-dlp wrappers)
│   └── store/              # Zustand Global State (usePlayerStore)
```

## Getting Started

### Prerequisites
* Node.js
* MongoDB instance (Local or Atlas)
* Python (required for `yt-dlp`)
* `yt-dlp` installed and accessible in your system's PATH
* Google Cloud Console account (for OAuth credentials)

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/unclepro/potify.git](https://github.com/unclepro/potify.git)
   cd potify
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables. Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   NEXTAUTH_SECRET=your_generated_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Author
**Aviral Pandey (uncle PRO)**

---
*Note: This project is currently a Work in Progress.*
