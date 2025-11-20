'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuizQuestions, Question } from '@/lib/kelime-bahcesi/hooks'
import { cn } from '@/lib/utils'

interface QuizGameProps {
  onBack: () => void
}

const TOTAL_QUESTIONS = 10
const TOTAL_TIME = 180 // 3 minutes

export default function QuizGame({ onBack }: QuizGameProps) {
  const { questions: pool, loading } = useQuizQuestions()
  const [gameQuestions, setGameQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [revealedIndices, setRevealedIndices] = useState<boolean[]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)
  const [gameState, setGameState] = useState<'loading' | 'playing' | 'finished'>('loading')
  const [input, setInput] = useState('')
  const [message, setMessage] = useState('')
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize game
  useEffect(() => {
    if (!loading && pool.length > 0 && gameQuestions.length === 0) {
      // Shuffle and pick 10
      const shuffled = [...pool].sort(() => 0.5 - Math.random())
      setGameQuestions(shuffled.slice(0, TOTAL_QUESTIONS))
      setGameState('playing')
    }
  }, [loading, pool, gameQuestions.length])

  // Setup current question
  useEffect(() => {
    if (gameQuestions.length > 0 && currentIndex < gameQuestions.length) {
      const q = gameQuestions[currentIndex]
      setRevealedIndices(new Array(q.cevap.length).fill(false))
      setInput('')
      setMessage('')
    } else if (gameQuestions.length > 0 && currentIndex >= gameQuestions.length) {
      endGame()
    }
  }, [currentIndex, gameQuestions])

  // Timer
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endGame()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [gameState])

  const endGame = () => {
    setGameState('finished')
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const handleRevealLetter = () => {
    const unrevealed = revealedIndices.map((val, idx) => val ? -1 : idx).filter(i => i !== -1)
    if (unrevealed.length === 0) return

    const randomIdx = unrevealed[Math.floor(Math.random() * unrevealed.length)]
    const newRevealed = [...revealedIndices]
    newRevealed[randomIdx] = true
    setRevealedIndices(newRevealed)

    // Check if all revealed
    if (newRevealed.every(v => v)) {
      setMessage('Tüm harfler açıldı! Geçiliyor...')
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1)
      }, 2000)
    }
  }

  const handleGuess = () => {
    const currentQ = gameQuestions[currentIndex]
    const guess = input.trim().toLocaleLowerCase('tr')
    
    if (guess === currentQ.cevap.toLocaleLowerCase('tr')) {
      // Calculate score
      const totalLen = currentQ.cevap.length
      const revealedCount = revealedIndices.filter(Boolean).length
      const earned = Math.max(1, totalLen - revealedCount)
      
      setScore(prev => prev + earned)
      setRevealedIndices(new Array(totalLen).fill(true)) // Show full word
      setMessage(`Doğru! +${earned} Puan`)
      
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1)
      }, 1000)
    } else {
      setMessage('Yanlış tahmin!')
      setTimeout(() => setMessage(''), 1500)
    }
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  if (gameState === 'loading') return <div className="text-center pt-20 text-white">Yükleniyor...</div>

  if (gameState === 'finished') {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto text-center pt-20"
      >
        <h2 className="text-5xl font-bold text-white mb-8">Oyun Bitti!</h2>
        <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8">
          {score}
        </div>
        <p className="text-xl text-gray-300 mb-12">Toplam Puan</p>
        
        <button
          onClick={onBack}
          className="px-8 py-4 bg-white text-purple-900 font-bold rounded-xl hover:scale-105 transition-transform"
        >
          Menüye Dön
        </button>
      </motion.div>
    )
  }

  const currentQ = gameQuestions[currentIndex]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 bg-slate-900/50 p-4 rounded-2xl backdrop-blur-md border border-white/10">
        <button 
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors"
        >
          Çıkış
        </button>
        <div className="flex gap-8 font-bold font-mono text-xl">
          <div className="text-purple-400">Puan: {score}</div>
          <div className={cn(timeLeft < 30 ? "text-red-500 animate-pulse" : "text-white")}>
            {formatTime(timeLeft)}
          </div>
        </div>
        <div className="text-gray-400">
          {currentIndex + 1} / {TOTAL_QUESTIONS}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-12 leading-relaxed">
          {currentQ.soru}
        </h3>

        {/* Letter Boxes */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {currentQ.cevap.split('').map((char, idx) => (
            <div
              key={idx}
              className={cn(
                "w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-2xl font-bold border-2 transition-all duration-500",
                revealedIndices[idx] 
                  ? "bg-purple-500/20 border-purple-500 text-purple-200 rotate-0" 
                  : "bg-slate-800 border-slate-700 text-transparent rotate-180"
              )}
            >
               {revealedIndices[idx] ? char.toLocaleUpperCase('tr') : '?'}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="max-w-md mx-auto space-y-4">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
              placeholder="Tahmininiz..."
              className="w-full bg-slate-950/50 border border-white/20 rounded-xl px-6 py-4 text-center text-xl font-bold text-white placeholder:text-gray-600 focus:border-purple-500 focus:outline-none transition-colors"
            />
            {message && (
               <div className="absolute -bottom-8 left-0 right-0 text-center font-bold text-purple-400">
                 {message}
               </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <button
              onClick={handleRevealLetter}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-colors"
            >
              Harf Aç (-1 Puan)
            </button>
            <button
              onClick={handleGuess}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-colors shadow-lg shadow-purple-600/30"
            >
              Tahmin Et
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  )
}

