'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MemoryGameProps {
  onBack: () => void
}

const ICONS = ['🔒', '🔑', '🛡️', '🦠', '💻', '📡', '💾', '🔋']

export default function MemoryGame({ onBack }: MemoryGameProps) {
  const [cards, setCards] = useState<{ id: number; icon: string; isFlipped: boolean; isMatched: boolean }[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    const shuffledIcons = [...ICONS, ...ICONS].sort(() => Math.random() - 0.5)
    setCards(shuffledIcons.map((icon, index) => ({
      id: index,
      icon,
      isFlipped: false,
      isMatched: false
    })))
    setFlippedCards([])
    setScore(0)
    setMoves(0)
    setIsLocked(false)
  }

  const handleCardClick = (id: number) => {
    if (isLocked) return
    const card = cards[id]
    if (card.isFlipped || card.isMatched) return

    // Flip card
    const newCards = [...cards]
    newCards[id].isFlipped = true
    setCards(newCards)

    const newFlipped = [...flippedCards, id]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      setIsLocked(true)
      setMoves(m => m + 1)
      checkForMatch(newFlipped[0], newFlipped[1])
    }
  }

  const checkForMatch = (id1: number, id2: number) => {
    const card1 = cards[id1]
    const card2 = cards[id2]

    if (card1.icon === card2.icon) {
      // Match found
      setTimeout(() => {
        const newCards = [...cards]
        newCards[id1].isMatched = true
        newCards[id2].isMatched = true
        setCards(newCards)
        setFlippedCards([])
        setScore(s => s + 100)
        setIsLocked(false)
      }, 500)
    } else {
      // No match
      setTimeout(() => {
        const newCards = [...cards]
        newCards[id1].isFlipped = false
        newCards[id2].isFlipped = false
        setCards(newCards)
        setFlippedCards([])
        setIsLocked(false)
      }, 1000)
    }
  }

  const isGameOver = cards.length > 0 && cards.every(c => c.isMatched)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
    >
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">← Menü</button>
        <h2 className="text-2xl font-bold text-white">Neon Hafıza</h2>
        <div className="text-right">
          <div className="text-xs text-gray-400">HAMLE</div>
          <div className="text-xl font-bold text-cyan-400">{moves}</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:gap-4 mb-8 max-w-[400px] mx-auto">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={cn(
              "aspect-square rounded-xl text-3xl flex items-center justify-center transition-all duration-300",
              card.isFlipped || card.isMatched
                ? "bg-cyan-900/50 border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)] rotate-0"
                : "bg-slate-800 border border-slate-700 hover:bg-slate-700 rotate-y-180"
            )}
            animate={{ rotateY: card.isFlipped || card.isMatched ? 0 : 180 }}
          >
            {(card.isFlipped || card.isMatched) ? card.icon : ''}
          </motion.button>
        ))}
      </div>

      {isGameOver && (
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold text-green-400 mb-2">Sistem Hacklendi! 🎉</h3>
          <p className="text-gray-300">Toplam Puan: {score - (moves * 10)}</p>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={startNewGame}
          className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-colors shadow-lg shadow-cyan-600/20"
        >
          {isGameOver ? 'Yeni Görev' : 'Yeniden Başlat'}
        </button>
      </div>
    </motion.div>
  )
}

