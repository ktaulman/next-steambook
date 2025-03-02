
import { Roboto } from 'next/font/google';
import "./globals.css";
import SideNav from './_components/side-nav';


const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={roboto.variable+""}
      >
        <main className='flex h-screen'>

          <div className="w-60   ">
            <SideNav />

          </div>
          <div className=' flex-1 '>
            {children}
          </div>

        </main>


      </body>
    </html>
  );
}
