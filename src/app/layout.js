//import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'
//import { Inter } from 'next/font/google'
import Link from 'next/link'
//import { useEffect } from 'react'

//const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sudoku Web',
  description: 'Sudoku web game using Next',
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sudoku Web",
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Sudoku Web",
    title: {
      default: "Sudoku Web",
      template: "Sudoku Web PWA",
    },
    description: "Sudoku web game using Next",
  },
  twitter: {
    card: "summary",
    title: {
      default: "Sudoku Web",
      template: "Sudoku Web - PWA",
    },
    description: "Sudoku web game using Next",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#703061" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className='bg-slate-800 md:bg-gray-950'>
      <nav className="bg-gray-700 p-3 border-b-4 border-fuchsia-900">
        <div className='flex items-center justify-between container m-auto'>
        <Link href="/">
          <p className="text-white">Sudoku Web</p>
        </Link>
        <Link href="/about"><p className="text-white">About</p></Link>
        </div>
      </nav>
      {children}
      </body>
    </html>
  )
}
