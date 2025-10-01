'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg blur-sm opacity-0 group-hover:opacity-75 transition-opacity"></div>
                <Image
                  src="/logo.svg"
                  alt="Frastoly Logo"
                  width={36}
                  height={36}
                  className="w-9 h-9 relative transition-transform group-hover:scale-110"
                />
              </div>
              <span className="font-heading text-xl font-bold bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 bg-clip-text text-transparent animate-gradient">
                Frastoly
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              <Link 
                href="/" 
                className="px-4 py-2 rounded-lg text-white hover:text-primary-400 hover:bg-white/5 transition-all duration-300 font-medium"
              >
                Ana Sayfa
              </Link>
              <Link 
                href="/oyunlar" 
                className="px-4 py-2 rounded-lg text-white hover:text-primary-400 hover:bg-white/5 transition-all duration-300 font-medium"
              >
                Oyunlar
              </Link>
              <Link 
                href="/hakkinda" 
                className="px-4 py-2 rounded-lg text-white hover:text-primary-400 hover:bg-white/5 transition-all duration-300 font-medium"
              >
                Hakkımızda
              </Link>
              <Link
                href="/siber-iz-surucu"
                className="ml-4 px-5 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-lg hover:from-primary-500 hover:to-secondary-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/50 hover:scale-105"
              >
                🎮 Oyuna Başla
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:text-primary-400 hover:bg-white/5 focus:outline-none transition-all"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-slide-down">
          <div className="px-4 pt-2 pb-4 space-y-2 bg-slate-950/95 backdrop-blur-xl border-t border-white/5">
            <Link
              href="/"
              className="block px-4 py-3 rounded-lg text-white hover:text-primary-400 hover:bg-white/5 transition-all font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Ana Sayfa
            </Link>
            <Link
              href="/oyunlar"
              className="block px-4 py-3 rounded-lg text-white hover:text-primary-400 hover:bg-white/5 transition-all font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Oyunlar
            </Link>
            <Link
              href="/hakkinda"
              className="block px-4 py-3 rounded-lg text-white hover:text-primary-400 hover:bg-white/5 transition-all font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Hakkımızda
            </Link>
            <Link
              href="/siber-iz-surucu"
              className="block px-4 py-3 mt-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-lg text-center hover:from-primary-500 hover:to-secondary-500 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              🎮 Oyuna Başla
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
