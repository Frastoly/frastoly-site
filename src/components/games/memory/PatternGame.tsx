'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PatternGameProps {
  onBack: () => void
}

export default function PatternGame({ onBack }: PatternGameProps) {
  const [pattern, setPattern] = useState<number[]>([])
  const [userPattern, setUserPattern] = useState<number[]>([])
  const [phase, setPhase] = useState<'idle' | 'showing' | 'input' | 'result'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    setPhase('idle')
    setMessage('')
    setUserPattern([0, 0, 0, 0])
    // Generate random pattern 1-4
    setPattern(Array.from({ length: 4 }, () => Math.floor(Math.random() * 4) + 1))
  }

  const showPattern = () => {
    setPhase('showing')
    setMessage('Deseni ezberle...')
    setTimeout(() => {
      setPhase('input')
      setMessage('Deseni oluştur!')
    }, 2000)
  }

  const handleCellClick = (index: number) => {
    if (phase !== 'input') return

    const newPattern = [...userPattern]
    newPattern[index] = (newPattern[index] % 4) + 1
    setUserPattern(newPattern)
  }

  const checkResult = () => {
    if (userPattern.some(v => v === 0)) {
      setMessage('Lütfen tüm kutuları doldur!')
      return
    }

    const isCorrect = JSON.stringify(pattern) === JSON.stringify(userPattern)
    setPhase('result')
    
    if (isCorrect) {
      setMessage('Harika! Doğru bildin 🎉')
    } else {
      setMessage('Maalesef yanlış. Tekrar dene!')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-2xl bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
    >
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">
          ← Menü
        </button>
        <h2 className="text-2xl font-bold text-white">Desen Takip</h2>
        <div className="w-12"></div>
      </div>

      <div className="min-h-[60px] text-center mb-8">
        <p className={cn(
          "text-xl font-bold transition-colors",
          phase === 'result' && message.includes('Harika') ? "text-green-400" :
          phase === 'result' ? "text-red-400" : "text-white"
        )}>
          {message || (phase === 'idle' ? 'Başlamaya hazır mısın?' : '')}
        </p>
      </div>

      {/* Pattern Display Area */}
      <div className="flex justify-center gap-4 mb-12 h-20">
        {phase === 'showing' ? (
          pattern.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-pink-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-pink-500/30"
            >
              {val}
            </motion.div>
          ))
        ) : (
          <div className="flex items-center justify-center w-full text-gray-500 italic">
            {phase === 'idle' ? 'Deseni görmek için butona bas' : '???'}
          </div>
        )}
      </div>

      {/* User Input Area */}
      <div className="flex justify-center gap-4 mb-8">
        {userPattern.map((val, idx) => (
          <motion.button
            key={idx}
            whileTap={phase === 'input' ? { scale: 0.9 } : {}}
            onClick={() => handleCellClick(idx)}
            disabled={phase !== 'input'}
            className={cn(
              "w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 flex items-center justify-center text-3xl font-bold transition-all",
              phase !== 'input' && phase !== 'result' ? "opacity-50 cursor-not-allowed bg-slate-800 border-slate-700" :
              val === 0 ? "bg-slate-800 border-slate-600 text-transparent hover:border-pink-400" :
              "bg-slate-700 border-pink-500 text-white shadow-lg shadow-pink-500/20"
            )}
          >
            {val || '?'}
          </motion.button>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        {phase === 'idle' || phase === 'result' ? (
          <button
            onClick={() => {
              startNewGame()
              showPattern()
            }}
            className="px-8 py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-xl font-bold transition-colors shadow-lg shadow-pink-600/20"
          >
            {phase === 'result' ? 'Tekrar Oyna' : 'Deseni Göster'}
          </button>
        ) : (
          <button
            onClick={checkResult}
            disabled={phase !== 'input'}
            className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-colors shadow-lg shadow-green-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Kontrol Et
          </button>
        )}
      </div>
    </motion.div>
  )
}
