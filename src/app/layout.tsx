import { Duru_Sans } from "next/font/google";
import "./globals.css";
import TopNavBar from "./_components/navigation/TopNavBar";


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
        <main className='flex flex-col w-screen h-screen'>
          <TopNavBar />
          <section className='grow shrink '>
            {children}
          </section>

        </main>

      </body>
    </html>
  );
}
