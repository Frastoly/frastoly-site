'use client';
import { useState, useEffect, ReactNode } from "react";
import Image from "next/image";

export default function SplashScreen({ children }: { children: ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  if (showSplash) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full animate-pulse"></div>
          <Image 
            src="/assets/logo.png" 
            alt="Frastoly Logo" 
            width={250} 
            height={250} 
            className="relative z-10 animate-pulse drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]"
            priority
          />
        </div>
      </div>
    );
  }
  return <>{children}</>;
} 