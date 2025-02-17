// app/layout.jsx (Server ComponentでもOK)
// ※ App Routerのデフォルトテンプレート例

import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '../app/components/NavBar'    // ★パスはご自身のプロジェクトに合わせて変更

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Stylish App',
  description: 'Description for My Stylish App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className} style={{ margin: 0 }}>
        <NavBar />
        {/* コンテンツとの間隔を作る場合はCSSやインラインスタイルで */}
        <main style={{ marginTop: '10px' }}>
          {children}
        </main>
      </body>
    </html>
  )
}