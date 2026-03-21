'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#11192e]/40 backdrop-blur-xl shadow-[0_0_20px_rgba(83,221,252,0.12)] border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-black italic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-headline">
              Frastoly Oyunları
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-on-surface-variant font-medium hover:scale-105 hover:text-white transition-all duration-300 font-body"
            >
              Ana Sayfa
            </Link>
            <Link 
              href="/#games" 
              className="text-on-surface-variant font-medium hover:scale-105 hover:text-white transition-all duration-300 font-body"
            >
              Oyunlar
            </Link>
            <Link 
              href="/hakkinda" 
              className="text-on-surface-variant font-medium hover:scale-105 hover:text-white transition-all duration-300 font-body"
            >
              Hakkımızda
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-on-surface-variant font-medium hover:text-white px-4 py-2 font-body">Giriş Yap</button>
            <Link
              href="/siber-iz-surucu"
              className="bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-bold px-6 py-2 rounded-full hover:scale-105 active:scale-95 duration-150 transition-all shadow-lg shadow-primary/20 font-body"
            >
              Oyuna Başla
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-on-surface hover:text-primary hover:bg-surface-variant/50 focus:outline-none transition-all"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-slide-down bg-[#11192e]/95 backdrop-blur-xl border-t border-outline-variant/20">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-3 rounded-lg text-on-surface hover:text-primary hover:bg-surface-variant/50 transition-all font-medium font-body"
              onClick={() => setIsMenuOpen(false)}
            >
              Ana Sayfa
            </Link>
            <Link
              href="/#games"
              className="block px-4 py-3 rounded-lg text-on-surface hover:text-primary hover:bg-surface-variant/50 transition-all font-medium font-body"
              onClick={() => setIsMenuOpen(false)}
            >
              Oyunlar
            </Link>
            <Link
              href="/hakkinda"
              className="block px-4 py-3 rounded-lg text-on-surface hover:text-primary hover:bg-surface-variant/50 transition-all font-medium font-body"
              onClick={() => setIsMenuOpen(false)}
            >
              Hakkımızda
            </Link>
            <div className="pt-4 border-t border-outline-variant/20 flex flex-col space-y-3">
              <button className="text-on-surface-variant font-medium hover:text-white px-4 py-2 font-body text-left w-full">Giriş Yap</button>
              <Link
                href="/siber-iz-surucu"
                className="block px-4 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-bold rounded-lg text-center hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20 font-body"
                onClick={() => setIsMenuOpen(false)}
              >
                Oyuna Başla
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
