import "./globals.css"
import AudioPlayer from "@/components/player/AudioPlayer"
import Navbar from "@/components/layout/Navbar"
import LyricsPanel from "@/components/layout/LyricsPanel"
import Sidebar from "@/components/layout/Sidebar"


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col overflow-hidden">
          <Navbar/>                 {/* Top navigation bar */}

        {/* Main wrapper excluding audioplayer and navbar */}
          <div className="flex-1 w-full flex overflow-hidden">  
            <Sidebar/>              {/* playlists side panel (left) */}

            <main className="pb-20 pt-16 ml-20 mr-100 flex-1 overflow-y-auto min-h-0 rounded">{children}</main> {/* centre area */}

            <LyricsPanel/>          {/* Lyrics Side panel (right) */}
        </div>

        <AudioPlayer/>              {/* audio player at bottom */}
      </body>
    </html>
  )
}