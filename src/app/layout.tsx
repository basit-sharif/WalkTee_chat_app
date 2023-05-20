import Navbar from '@/components/views/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/views/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WalkTee',
  description: 'A Chatting app across the world wide',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className='h-screen w-screen overflow-hidden'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
