'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LogicGameProps {
  onBack: () => void
}

const SIZE = 4

export default function LogicGame({ onBack }: LogicGameProps) {
  const [grid, setGrid] = useState<number[]>([])
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    setGrid(new Array(SIZE * SIZE).fill(0))
    setMessage(null)
  }

  const handleCellClick = (index: number) => {
    if (message?.type === 'success') return

    const newGrid = [...grid]
    newGrid[index] = (newGrid[index] % SIZE) + 1
    setGrid(newGrid)
    setMessage(null)
  }

  const checkSolution = () => {
    let valid = true
    
    // Check rows and cols
    for (let i = 0; i < SIZE; i++) {
      const row = new Set()
      const col = new Set()
      
      for (let j = 0; j < SIZE; j++) {
        const rowVal = grid[i * SIZE + j]
        const colVal = grid[j * SIZE + i]
        
        if (rowVal === 0 || row.has(rowVal)) valid = false
        if (colVal === 0 || col.has(colVal)) valid = false
        
        row.add(rowVal)
        col.add(colVal)
      }
    }

    if (valid) {
      setMessage({ text: 'Tebrikler! Doğru çözüm! 🎉', type: 'success' })
    } else {
      setMessage({ text: 'Hatalı veya eksik alanlar var!', type: 'error' })
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
        <h2 className="text-2xl font-bold text-white">Mantık Blokları</h2>
        <div className="w-12"></div>
      </div>

      <p className="text-center text-gray-300 mb-8">
        Her satır ve sütunda 1-4 arası sayılar sadece bir kez bulunmalıdır.
        Hücrelere tıklayarak sayıları değiştirin.
      </p>

      <div className="grid grid-cols-4 gap-2 max-w-[300px] mx-auto mb-8">
        {grid.map((val, idx) => (
          <motion.button
            key={idx}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCellClick(idx)}
            className={cn(
              "w-16 h-16 rounded-xl text-2xl font-bold flex items-center justify-center transition-all border-2",
              val === 0 
                ? "bg-slate-800/50 border-slate-700 text-transparent" 
                : "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
            )}
          >
            {val || '?'}
          </motion.button>
        ))}
      </div>

      {message && (
        <div className={cn(
          "text-center font-bold mb-6",
          message.type === 'success' ? "text-green-400" : "text-red-400"
        )}>
          {message.text}
        </div>
      )}

      <div className="flex justify-center gap-4">
        <button
          onClick={startNewGame}
          className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-colors"
        >
          Temizle
        </button>
        <button
          onClick={checkSolution}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-colors shadow-lg shadow-indigo-600/20"
        >
          Kontrol Et
        </button>
      </div>
    </motion.div>
  )
}

