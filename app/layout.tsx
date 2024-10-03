import './globals.css'
import '@fontsource/geist-sans'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ThemeProvider } from "@/components/theme-provider"
import Footer from '@/components/Footer'

export const metadata = {
  title: 'XMUM Database',
  description: 'A comprehensive database of datasets, notes, and articles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={'font-geist'}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}