import "./globals.css"
import AudioPlayer from "@/components/player/AudioPlayer"
import Navbar from "@/components/layout/Navbar"
import LyricsPanel from "@/components/layout/LyricsPanel"
import Sidebar from "@/components/layout/Sidebar"


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Navbar/>
        </nav>                  {/* Top navigation bar */}
        <main>{children}</main> {/* centre area */}

        <Sidebar/>              {/* playlists side panel (left) */}
        <LyricsPanel/>          {/* Lyrics Side panel (right) */}
        <AudioPlayer/>          {/* audio player at bottom */}
        <footer>footer</footer>
      </body>
    </html>
  )
}