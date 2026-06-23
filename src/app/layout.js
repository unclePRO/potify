import "./globals.css"
import AudioPlayer from "@/components/player/AudioPlayer"
import Navbar from "@/components/layout/Navbar"
import LyricsPanel from "@/components/layout/LyricsPanel"
import Sidebar from "@/components/layout/Sidebar"
import AuthProvider from "@/components/AuthProvider"
import LogTripwire from "@/components/LogTripwire"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"

export const metadata = {
  title: 'Potify',
  description: 'A music app made by unclepro, work in progress',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="h-screen flex flex-col overflow-hidden bg-potify-void text-potify-text">
        <AuthProvider session={session}>
          <LogTripwire/>
          <Navbar session={session}/>                 {/* Top navigation bar */}

          {/* Main wrapper excluding audioplayer and navbar */}
          <div className="flex-1 w-full flex overflow-hidden">  
            <Sidebar session={session}/>              {/* playlists side panel (left) */}

            <main className="pb-20 pt-16 ml-20 flex-1 overflow-y-auto min-h-0 rounded bg-potify-void">{children}</main> {/* centre area */}

            <LyricsPanel session={session}/>          {/* Lyrics Side panel (right) */}
          </div>

          <AudioPlayer session={session}/>              {/* audio player at bottom */}
        </AuthProvider>
      </body>
    </html>
  )
}