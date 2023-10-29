//import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'
//import { Inter } from 'next/font/google'
import Link from 'next/link'
//import { useEffect } from 'react'

//const inter = Inter({ subsets: ['latin'] })

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

  /*
    <html lang="en">
      <body>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom border-black justify-content-between">
        <Link href="/">
          <p className="navbar-brand">Sudoku Web</p>
        </Link>
        <Link href="/about"><p className="navbar-nav">About</p></Link>
      </nav>
      {children}
      </body>
    </html>
  */
  return (
    <html lang="en">
      <body className='bg-gray-950'>
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
