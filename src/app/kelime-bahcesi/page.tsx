'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ClassicGame from '@/components/kelime-bahcesi/ClassicGame'
import QuizGame from '@/components/kelime-bahcesi/QuizGame'

type GameMode = 'MENU' | 'CLASSIC' | 'CHAIN' | 'QUIZ'

export default function KelimeBahcesiPage() {
  const [gameMode, setGameMode] = useState<GameMode>('MENU')

  const handleBackToMenu = () => setGameMode('MENU')

  return (
    <main className="w-full min-h-screen pt-24 pb-12 px-4 sm:px-6 bg-[url('/assets/background.jpg')] bg-cover bg-fixed bg-center">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm fixed z-0"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
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
                  <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent text-shimmer">
                    Kelime Bahçesi
                  </span>
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Kelime hazineni geliştir, zihnini zorla ve eğlen!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                {/* Klasik Mod */}
                <button
                  onClick={() => setGameMode('CLASSIC')}
                  className="group relative p-8 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-amber-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20 text-left overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 mb-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">Klasik Mod</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Verilen harflerden anlamlı kelimeler türet. En yüksek puanı topla!
                    </p>
                  </div>
                </button>

                {/* Zincir Modu */}
                <button
                  onClick={() => setGameMode('CHAIN')}
                  className="group relative p-8 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-emerald-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20 text-left overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 mb-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Zincir Modu</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Kelime zinciri kur! Son harfle başlayan yeni kelimeler bul ve bonusları kap.
                    </p>
                  </div>
                </button>

                {/* Yarışma Modu */}
                <button
                  onClick={() => setGameMode('QUIZ')}
                  className="group relative p-8 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 text-left overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 mb-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Yarışma Modu</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Tanımları bil, harfleri aç ve kelimeyi tahmin et. Zamana karşı yarış!
                    </p>
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {(gameMode === 'CLASSIC' || gameMode === 'CHAIN') && (
            <ClassicGame mode={gameMode} onBack={handleBackToMenu} />
          )}

          {gameMode === 'QUIZ' && (
            <QuizGame onBack={handleBackToMenu} />
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

