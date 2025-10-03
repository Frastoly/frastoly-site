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
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white antialiased">
        {/* Background patterns */}
        <div className="fixed inset-0 opacity-10 pointer-events-none -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        <div className="fixed inset-0 bg-gradient-to-t from-transparent via-purple-500/5 to-transparent pointer-events-none -z-10"></div>
        
        <SplashScreen>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 w-full">
              {children}
            </div>
          </div>
        </SplashScreen>
      </body>
    </html>
  );
}
