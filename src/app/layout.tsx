import { Roboto } from 'next/font/google';
import "./globals.css";

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
        className={roboto.variable + 'flex h-screen bg-red-300'}
      >
        <div className=" flex bg-orange-300 ">
          SideNaveefef
        </div>
        <div className='flex-1 bg-yellow-300'>
          {children}
        </div>



      </body>
    </html>
  );
}
