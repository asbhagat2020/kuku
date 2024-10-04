import localFont from "next/font/local";
import "./globals.css";

import { Karla, Luckiest_Guy } from 'next/font/google'

const karla = Karla({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-karla',
})

const luckiestGuy = Luckiest_Guy({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-luckiest-guy',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${karla.variable} ${luckiestGuy.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
