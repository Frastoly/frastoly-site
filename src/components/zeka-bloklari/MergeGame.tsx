'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MergeGameProps {
  onBack: () => void
}

const SIZE = 4

export default function MergeGame({ onBack }: MergeGameProps) {
  const [grid, setGrid] = useState<number[]>(new Array(SIZE * SIZE).fill(0))
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)

  const addRandomTile = useCallback((currentGrid: number[]) => {
    const emptyIndices = currentGrid.map((v, i) => v === 0 ? i : -1).filter(i => i !== -1)
    if (emptyIndices.length === 0) return currentGrid

    const idx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)]
    const newGrid = [...currentGrid]
    newGrid[idx] = Math.random() < 0.9 ? 2 : 4
    return newGrid
  }, [])

  const initGame = useCallback(() => {
    let newGrid = new Array(SIZE * SIZE).fill(0)
    newGrid = addRandomTile(newGrid)
    newGrid = addRandomTile(newGrid)
    setGrid(newGrid)
    setScore(0)
    setGameOver(false)
    setWon(false)
  }, [addRandomTile])

  useEffect(() => {
    initGame()
  }, [initGame])

  const move = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameOver) return

    let moved = false
    let newScore = score
    const newGrid = [...grid]

    const getIndex = (r: number, c: number) => r * SIZE + c

    const slideLine = (line: number[]) => {
      let arr = line.filter(x => x !== 0)
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
          arr[i] *= 2
          newScore += arr[i]
          arr[i + 1] = 0
        }
      }
      arr = arr.filter(x => x !== 0)
      while (arr.length < SIZE) arr.push(0)
      return arr
    }

    if (direction === 'left') {
      for (let r = 0; r < SIZE; r++) {
        const row = []
        for (let c = 0; c < SIZE; c++) row.push(newGrid[getIndex(r, c)])
        const newRow = slideLine(row)
        for (let c = 0; c < SIZE; c++) {
          if (newGrid[getIndex(r, c)] !== newRow[c]) moved = true
          newGrid[getIndex(r, c)] = newRow[c]
        }
      }
    } else if (direction === 'right') {
      for (let r = 0; r < SIZE; r++) {
        const row = []
        for (let c = 0; c < SIZE; c++) row.push(newGrid[getIndex(r, c)])
        const newRow = slideLine(row.reverse()).reverse()
        for (let c = 0; c < SIZE; c++) {
          if (newGrid[getIndex(r, c)] !== newRow[c]) moved = true
          newGrid[getIndex(r, c)] = newRow[c]
        }
      }
    } else if (direction === 'up') {
      for (let c = 0; c < SIZE; c++) {
        const col = []
        for (let r = 0; r < SIZE; r++) col.push(newGrid[getIndex(r, c)])
        const newCol = slideLine(col)
        for (let r = 0; r < SIZE; r++) {
          if (newGrid[getIndex(r, c)] !== newCol[r]) moved = true
          newGrid[getIndex(r, c)] = newCol[r]
        }
      }
    } else if (direction === 'down') {
      for (let c = 0; c < SIZE; c++) {
        const col = []
        for (let r = 0; r < SIZE; r++) col.push(newGrid[getIndex(r, c)])
        const newCol = slideLine(col.reverse()).reverse()
        for (let r = 0; r < SIZE; r++) {
          if (newGrid[getIndex(r, c)] !== newCol[r]) moved = true
          newGrid[getIndex(r, c)] = newCol[r]
        }
      }
    }

    if (moved) {
      const finalGrid = addRandomTile(newGrid)
      setGrid(finalGrid)
      setScore(newScore)
      
      if (finalGrid.includes(2048) && !won) {
        setWon(true)
      }

      if (!finalGrid.includes(0)) {
        // Check game over
        let canMove = false
        for (let r = 0; r < SIZE; r++) {
          for (let c = 0; c < SIZE; c++) {
            const val = finalGrid[getIndex(r, c)]
            if (c < SIZE - 1 && val === finalGrid[getIndex(r, c + 1)]) canMove = true
            if (r < SIZE - 1 && val === finalGrid[getIndex(r + 1, c)]) canMove = true
          }
        }
        if (!canMove) setGameOver(true)
      }
    }
  }, [grid, score, gameOver, won, addRandomTile])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
        const dir = e.key.replace('Arrow', '').toLowerCase() as 'up' | 'down' | 'left' | 'right'
        move(dir)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [move])

  // Color mapping for tiles
  const getTileColor = (val: number) => {
    const colors: Record<number, string> = {
      0: 'bg-slate-800/50',
      2: 'bg-emerald-100 text-slate-800',
      4: 'bg-emerald-200 text-slate-800',
      8: 'bg-emerald-300 text-white',
      16: 'bg-emerald-400 text-white',
      32: 'bg-emerald-500 text-white',
      64: 'bg-emerald-600 text-white',
      128: 'bg-teal-400 text-white',
      256: 'bg-teal-500 text-white shadow-[0_0_10px_#14b8a6]',
      512: 'bg-teal-600 text-white shadow-[0_0_15px_#0d9488]',
      1024: 'bg-cyan-500 text-white shadow-[0_0_20px_#06b6d4]',
      2048: 'bg-cyan-600 text-white shadow-[0_0_25px_#0891b2]',
    }
    return colors[val] || 'bg-slate-900 text-white'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl"
    >
      <div className="flex justify-between items-start mb-8">
        <div>
           <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors mb-2 text-sm">
            ← Menü
          </button>
          <h2 className="text-3xl font-bold text-white">2048</h2>
        </div>
        <div className="bg-slate-800 px-4 py-2 rounded-xl text-center border border-white/5">
          <div className="text-xs text-gray-400 uppercase font-bold">Skor</div>
          <div className="text-xl font-bold text-white">{score}</div>
        </div>
      </div>

      <div className="relative bg-slate-800 p-3 rounded-xl border border-white/5 aspect-square">
        {/* Grid Background */}
        <div className="grid grid-cols-4 gap-3 h-full">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="bg-slate-700/30 rounded-lg w-full h-full" />
          ))}
        </div>

        {/* Tiles */}
        <div className="absolute inset-3 grid grid-cols-4 gap-3">
          <AnimatePresence>
            {grid.map((val, idx) => (
              <div key={idx} className="relative w-full h-full flex items-center justify-center">
                {val !== 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={`${idx}-${val}`} // Re-animate on value change
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className={cn(
                      "absolute inset-0 rounded-lg flex items-center justify-center font-bold text-2xl sm:text-3xl transition-colors duration-200",
                      getTileColor(val)
                    )}
                  >
                    {val}
                  </motion.div>
                )}
              </div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Overlay */}
        {(gameOver || won) && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl z-20"
          >
             <h3 className="text-4xl font-black text-white mb-4">
               {won ? 'Tebrikler!' : 'Oyun Bitti'}
             </h3>
             {won && <p className="text-emerald-400 mb-6 font-bold">2048&apos;e ulaştın!</p>}
             <button
               onClick={initGame}
               className="px-8 py-3 bg-white text-slate-900 font-bold rounded-xl hover:scale-105 transition-transform"
             >
               Tekrar Oyna
             </button>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 mt-6 max-w-[200px] mx-auto">
        <div></div>
        <button onClick={() => move('up')} className="p-4 bg-slate-700 rounded-lg hover:bg-slate-600 active:bg-slate-500">⬆️</button>
        <div></div>
        <button onClick={() => move('left')} className="p-4 bg-slate-700 rounded-lg hover:bg-slate-600 active:bg-slate-500">⬅️</button>
        <button onClick={() => move('down')} className="p-4 bg-slate-700 rounded-lg hover:bg-slate-600 active:bg-slate-500">⬇️</button>
        <button onClick={() => move('right')} className="p-4 bg-slate-700 rounded-lg hover:bg-slate-600 active:bg-slate-500">➡️</button>
      </div>
    </motion.div>
  )
}

