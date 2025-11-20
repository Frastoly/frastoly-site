'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface GameLayoutProps {
  title: string
  description?: string
  score?: number
  children: ReactNode
  onBack?: () => void
  backLink?: string
}

export default function GameLayout({ 
  title, 
  description, 
  score, 
  children, 
  onBack,
  backLink = "/" 
}: GameLayoutProps) {
  return (
    <div className="w-full min-h-screen bg-slate-950 text-white p-4 md:p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-slate-900/50 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-4 w-full md:w-auto">
            {onBack ? (
              <button 
                onClick={onBack}
                className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors group"
              >
                <svg className="w-6 h-6 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            ) : (
              <Link 
                href={backLink}
                className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors group"
              >
                <svg className="w-6 h-6 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
            )}
            
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {title}
              </h1>
              {description && (
                <p className="text-sm text-gray-400 hidden md:block">{description}</p>
              )}
            </div>
          </div>

          {typeof score === 'number' && (
            <div className="flex items-center gap-3 bg-slate-800/50 px-6 py-3 rounded-2xl border border-white/5">
              <span className="text-gray-400 uppercase text-xs font-bold tracking-wider">Skor</span>
              <span className="text-2xl font-mono font-bold text-primary-400">{score}</span>
            </div>
          )}
        </div>

        {/* Game Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}

