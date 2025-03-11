
// import { Roboto } from 'next/font/google';
import { Duru_Sans } from "next/font/google";
import "./globals.css";
import SideNav from './_components/navigation/side-nav';


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
        <main className='flex h-screen dark '>

          <div className="w-60 dark:bg-black ">
            <SideNav />
          </div>
          <div className=' dark:bg-black border-3 border-dashed flex-1'>
            {children}
          </div>

        </main>


      </body>
    </html>
  );
}
