// app/layout.tsx (サーバーコンポーネントとして薄い構成)
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'jhara's homepage',
  description: 'Description for My Stylish App',
  viewport: 'width=device-width, initial-scale=1', 
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={inter.className} style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
