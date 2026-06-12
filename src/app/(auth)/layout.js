export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <footer className="text-xs"></footer>
      </body>
    </html>
  )
}