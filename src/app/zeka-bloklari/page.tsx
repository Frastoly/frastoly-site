'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SortingGame from '@/components/zeka-bloklari/SortingGame'
import LogicGame from '@/components/zeka-bloklari/LogicGame'
import PatternGame from '@/components/zeka-bloklari/PatternGame'
import MergeGame from '@/components/zeka-bloklari/MergeGame'

type GameMode = 'MENU' | 'SORTING' | 'LOGIC' | 'PATTERN' | 'MERGE'

export default function ZekaBloklariPage() {
  const [gameMode, setGameMode] = useState<GameMode>('MENU')

  const handleBackToMenu = () => setGameMode('MENU')

  return (
    <main className="w-full min-h-screen pt-24 pb-12 px-4 sm:px-6 bg-[url('/assets/background.jpg')] bg-cover bg-fixed bg-center">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm fixed z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {gameMode === 'MENU' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center w-full"
            >
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-7xl font-heading font-black mb-4">
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400 bg-clip-text text-transparent text-shimmer">
                    Zeka Blokları
                  </span>
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Mantığını kullan, desenleri takip et ve blokları yönet!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {/* Sıralama Modu */}
                <button
                  onClick={() => setGameMode('SORTING')}
                  className="group relative p-6 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-blue-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 text-left overflow-hidden h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 mb-4 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-bold text-white">123</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Sıralama</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Blokları küçükten büyüğe doğru sırala.
                    </p>
                  </div>
                </button>

                {/* Mantık Modu */}
                <button
                  onClick={() => setGameMode('LOGIC')}
                  className="group relative p-6 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-indigo-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 text-left overflow-hidden h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 mb-4 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">Mantık</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Satır ve sütunlarda tekrar etmeyen sayıları bul.
                    </p>
                  </div>
                </button>

                {/* Desen Modu */}
                <button
                  onClick={() => setGameMode('PATTERN')}
                  className="group relative p-6 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-pink-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/20 text-left overflow-hidden h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 mb-4 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">Desen</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Gösterilen deseni hafızana at ve tekrarla.
                    </p>
                  </div>
                </button>

                {/* Birleştir Modu */}
                <button
                  onClick={() => setGameMode('MERGE')}
                  className="group relative p-6 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-emerald-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20 text-left overflow-hidden h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 mb-4 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl font-bold text-white">2048</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Birleştir</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Aynı sayıları birleştirerek 2048&apos;e ulaş.
                    </p>
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {gameMode !== 'MENU' && (
            <div className="w-full flex justify-center">
              {gameMode === 'SORTING' && <SortingGame onBack={handleBackToMenu} />}
              {gameMode === 'LOGIC' && <LogicGame onBack={handleBackToMenu} />}
              {gameMode === 'PATTERN' && <PatternGame onBack={handleBackToMenu} />}
              {gameMode === 'MERGE' && <MergeGame onBack={handleBackToMenu} />}
            </div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

