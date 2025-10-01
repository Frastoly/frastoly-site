import type { Metadata } from "next";
import { Poppins, Exo_2 } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import SplashScreen from "../components/SplashScreen";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const exo2 = Exo_2({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-exo2",
  weight: ["400", "500", "600", "700", "800", "900"],
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
    <html lang="tr" className={`${poppins.variable} ${exo2.variable}`}>
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-x-hidden">
        <div className="fixed inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none"></div>
        <div className="fixed inset-0 bg-gradient-to-t from-transparent via-purple-500/5 to-transparent pointer-events-none"></div>
        <SplashScreen>
          <div className="relative z-10">
            <Navbar />
            {children}
          </div>
        </SplashScreen>
      </body>
    </html>
  );
}
