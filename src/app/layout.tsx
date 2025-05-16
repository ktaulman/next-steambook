

import { Duru_Sans } from "next/font/google";
import "./globals.css";
import SideNav from '@/app/_components/navigation/SideNav';


const duru_sans = Duru_Sans({
  weight: ['400'],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={duru_sans.className + ""}
      >
        <main className='flex h-screen'>

          <SideNav />
          <section className='grow shrink '>
            {children}
          </section>

        </main>

      </body>
    </html>
  );
}
