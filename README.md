# 🎵 Potify ![Status](https://img.shields.io/badge/Status-WIP-orange)

A high-quality, lightweight music streaming platform built from scratch. Potify leverages `yt-dlp` to deliver instantaneous, zero-transcoding Opus audio streams (160 kbps, Format 251) directly to a persistent web player, offering an audio experience that competes with premium streaming services.

## ✨ Features (Planned & In Progress)
* **High-Fidelity Audio:** Streams raw `.webm` Opus audio directly to the client without lossy MP3 transcoding.
* **Persistent Playback:** Global audio player UI that continues playing seamlessly while navigating across different pages (Search, Library, Liked).
* **On-the-fly Streaming:** No massive server storage required; audio is proxied directly via Next.js backend services.
* **Modern State Management:** Instant cross-component communication for play/pause/queue states using Zustand.

## 🛠️ Tech Stack
* **Frontend:** Next.js (App Router), React, Tailwind CSS
* **Backend:** Next.js API Routes, Node.js `child_process`
* **Database:** MongoDB & Mongoose
* **State Management:** Zustand
* **Audio Engine:** `yt-dlp`

## 📂 Project Structure
Built with a heavy focus on separation of concerns to keep API routes clean and React components modular.

    potify/
    ├── src/
    │   ├── app/                # Next.js App Router (Pages & API)
    │   │   ├── (auth)/         # Route Group: Login/Registration (No player)
    │   │   ├── (main)/         # Route Group: Core App (Persistent Audio Player)
    │   │   │   ├── search/     
    │   │   │   ├── library/    
    │   │   │   └── liked/      
    │   │   ├── api/            # Backend API Endpoints
    │   │   │   ├── stream/     # yt-dlp audio proxy
    │   │   │   └── search/     # YouTube metadata queries
    │   │   └── layout.jsx      # Root HTML/Body
    │   │
    │   ├── components/         # React UI Building Blocks
    │   │   ├── layout/         # Sidebar, Navbar
    │   │   ├── player/         # AudioPlayer, ProgressBar, Volume
    │   │   └── ui/             # Reusable Buttons, Cards, Inputs
    │   │
    │   ├── models/             # Mongoose Database Schemas
    │   ├── services/           # Backend Engines (yt-dlp logic, DB connection)
    │   └── store/              # Zustand Global State

## 🚀 Getting Started

### Prerequisites
* Node.js
* MongoDB instance (local or Atlas)
* Python (required for `yt-dlp`)
* `yt-dlp` installed and accessible in your system's PATH

### Installation
1. Clone the repository:
   `git clone https://github.com/yourusername/potify.git`
   `cd potify`
2. Install dependencies:
   `npm install`
3. Set up environment variables. Create a `.env.local` file in the root directory:
   `MONGODB_URI=your_mongodb_connection_string_here`
4. Run the development server:
   `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 👨‍💻 Author
**Aviral**

---
*Note: This project is currently a Work in Progress.*