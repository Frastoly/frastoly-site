import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import SplashScreen from "../components/SplashScreen";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-headline",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Frastoly Oyunları - The Cosmic Classroom",
  description: "Eğitimi oyunlaştıran, geleceği tasarlayan yeni nesil kozmik sınıf platformu.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`dark ${plusJakarta.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-background text-on-surface antialiased overflow-x-hidden font-body">
        {/* Nebula Background Orbs */}
        <div className="nebula-glow -top-48 -left-48"></div>
        <div className="nebula-glow -bottom-48 -right-48"></div>
        
        <SplashScreen>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 w-full relative z-10">
              {children}
            </div>
          </div>
        </SplashScreen>
      </body>
    </html>
  );
}
