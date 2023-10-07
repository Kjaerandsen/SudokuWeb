import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
//import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sudoku Web',
  description: 'Sudoku web game using Next',
}

export default function RootLayout({ children }) {
  /*
  useEffect(()=>
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  )
  */
  return (
    <html lang="en">
      <body className={inter.className}>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <Link href="/">
            <p class="navbar-brand">Sudoku Web</p>
          </Link>
        </nav>
      {children}
      </body>
    </html>
  )
}
