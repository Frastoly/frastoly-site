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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <Image src="/assets/frastoly-logo.png" alt="Frastoly Logo" width={220} height={220} className="animate-pulse" />
      </div>
    );
  }
  return <>{children}</>;
} 