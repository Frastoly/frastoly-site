import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import SplashScreen from "../components/SplashScreen";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Frastoly - Eğitici Oyunlar",
  description: "Eğitici ve eğlenceli oyunlar platformu",
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
    <html lang="tr" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-dark-200 text-white">
        <SplashScreen>
          <Navbar />
          {children}
        </SplashScreen>
      </body>
    </html>
  );
}
