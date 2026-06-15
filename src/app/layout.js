import "./globals.css"
import AudioPlayer from "@/components/player/AudioPlayer"
import Navbar from "@/components/layout/Navbar"
import LyricsPanel from "@/components/layout/LyricsPanel"
import Sidebar from "@/components/layout/Sidebar"
import AuthProvider from "@/components/AuthProvider"
import LogTripwire from "@/components/LogTripwire"

export const metadata = {
  title: 'Potify',
  description: 'A music app made by aviral [WIP]',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col overflow-hidden bg-potify-void text-potify-text">
        <AuthProvider>
          <LogTripwire/>
          <Navbar/>                 {/* Top navigation bar */}

          {/* Main wrapper excluding audioplayer and navbar */}
          <div className="flex-1 w-full flex overflow-hidden">  
            <Sidebar/>              {/* playlists side panel (left) */}

            <main className="pb-20 pt-16 ml-20 mr-100 flex-1 overflow-y-auto min-h-0 rounded bg-potify-void">{children}</main> {/* centre area */}

            <LyricsPanel/>          {/* Lyrics Side panel (right) */}
          </div>

          <AudioPlayer/>              {/* audio player at bottom */}
        </AuthProvider>
      </body>
    </html>
  )
}