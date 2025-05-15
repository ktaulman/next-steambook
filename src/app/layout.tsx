

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
        <main className='flex h-screen bg-white '>

          <div className="w-48 bg-white  border-r-2 border-solid border-gray-500">
            <SideNav />
          </div>
          <div id='' className=' bg-white  flex-1'>
            {children}
          </div>

        </main>
      </body>
    </html>
  );
}
