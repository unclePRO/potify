export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>My NavBar</nav>
        <main>{children}</main>
        <footer>My Footer</footer>
      </body>
    </html>
  )
}