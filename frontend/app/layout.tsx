import './globals.css'
import ThemeProvider from './ThemeProvider'

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_TITLE || 'Real-Time AI Chat'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
