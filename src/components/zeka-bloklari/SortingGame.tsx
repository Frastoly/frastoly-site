'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SortingGameProps {
  onBack: () => void
}

export default function SortingGame({ onBack }: SortingGameProps) {
  const [blocks, setBlocks] = useState<number[]>([])
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | 'info' } | null>(null)

  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    const newBlocks = [1, 2, 3, 4, 5].sort(() => Math.random() - 0.5)
    setBlocks(newBlocks)
    setSelectedIdx(null)
    setMessage(null)
  }

  const handleBlockClick = (index: number) => {
    if (message?.type === 'success') return

    if (selectedIdx === null) {
      setSelectedIdx(index)
    } else {
      if (selectedIdx === index) {
        setSelectedIdx(null)
      } else {
        // Swap
        const newBlocks = [...blocks]
        const temp = newBlocks[selectedIdx]
        newBlocks[selectedIdx] = newBlocks[index]
        newBlocks[index] = temp
        setBlocks(newBlocks)
        setSelectedIdx(null)
        checkWin(newBlocks)
      }
    }
  }

  const checkWin = (currentBlocks: number[]) => {
    const isWin = currentBlocks.every((val, i) => val === i + 1)
    if (isWin) {
      setMessage({ text: 'Tebrikler! Doğru sıraladın! 🎉', type: 'success' })
      setTimeout(startNewGame, 2000)
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
        <h2 className="text-2xl font-bold text-white">Sıralama Blokları</h2>
        <div className="w-12"></div>
      </div>

      <p className="text-center text-gray-300 mb-8">
        Blokları küçükten büyüğe (1-5) sıralamak için tıklayarak yerlerini değiştirin.
      </p>

      <div className="flex justify-center gap-4 mb-8">
        {blocks.map((num, idx) => (
          <motion.button
            key={`${idx}-${num}`} // Key includes idx to force re-render if needed or keep simple
            layout
            onClick={() => handleBlockClick(idx)}
            className={cn(
              "w-16 h-16 sm:w-20 sm:h-20 rounded-2xl text-3xl font-bold flex items-center justify-center transition-all shadow-lg",
              selectedIdx === idx
                ? "bg-blue-500 text-white ring-4 ring-blue-400/50 scale-110 z-10"
                : "bg-slate-800 text-blue-200 hover:bg-slate-700"
            )}
          >
            {num}
          </motion.button>
        ))}
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "text-center text-xl font-bold mb-4",
            message.type === 'success' ? "text-green-400" : "text-white"
          )}
        >
          {message.text}
        </motion.div>
      )}

      <div className="flex justify-center">
        <button
          onClick={startNewGame}
          className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-colors"
        >
          Yeniden Başlat
        </button>
      </div>
    </motion.div>
  )
}

