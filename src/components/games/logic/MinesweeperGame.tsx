'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import GameLayout from '@/components/shared/GameLayout'

interface Cell {
  id: number
  isMine: boolean
  isOpen: boolean
  isFlagged: boolean
  neighborCount: number
}

export default function MinesweeperGame() {
  const [grid, setGrid] = useState<Cell[]>([])
  const [gameOver, setGameOver] = useState(false)
  const [win, setWin] = useState(false)
  const [score, setScore] = useState(0)
  
  const SIZE = 8
  const MINES = 10

  const initGame = () => {
    let newGrid: Cell[] = Array.from({ length: SIZE * SIZE }, (_, i) => ({
      id: i,
      isMine: false,
      isOpen: false,
      isFlagged: false,
      neighborCount: 0
    }))

    // Place mines
    let minesPlaced = 0
    while (minesPlaced < MINES) {
      const idx = Math.floor(Math.random() * (SIZE * SIZE))
      if (!newGrid[idx].isMine) {
        newGrid[idx].isMine = true
        minesPlaced++
      }
    }

    // Calculate neighbors
    newGrid = newGrid.map((cell, idx) => {
      if (cell.isMine) return cell
      
      const row = Math.floor(idx / SIZE)
      const col = idx % SIZE
      let count = 0

      for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
          if (r === 0 && c === 0) continue
          const nr = row + r
          const nc = col + c
          if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE) {
            if (newGrid[nr * SIZE + nc].isMine) count++
          }
        }
      }
      return { ...cell, neighborCount: count }
    })

    setGrid(newGrid)
    setGameOver(false)
    setWin(false)
    setScore(0)
  }

  useEffect(() => {
    initGame()
  }, [])

  const handleCellClick = (index: number) => {
    if (gameOver || win || grid[index].isFlagged || grid[index].isOpen) return

    const newGrid = [...grid]
    const cell = newGrid[index]

    if (cell.isMine) {
      // Game Over
      setGameOver(true)
      // Reveal all mines
      newGrid.forEach(c => {
        if (c.isMine) c.isOpen = true
      })
    } else {
      // Open cell
      const openCell = (idx: number) => {
        if (newGrid[idx].isOpen || newGrid[idx].isFlagged) return
        newGrid[idx].isOpen = true
        setScore(prev => prev + 10)

        if (newGrid[idx].neighborCount === 0) {
          // Flood fill
          const row = Math.floor(idx / SIZE)
          const col = idx % SIZE
          for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
              const nr = row + r
              const nc = col + c
              if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE) {
                openCell(nr * SIZE + nc)
              }
            }
          }
        }
      }
      openCell(index)
      
      // Check Win
      const nonMines = newGrid.filter(c => !c.isMine)
      if (nonMines.every(c => c.isOpen)) {
        setWin(true)
      }
    }
    setGrid(newGrid)
  }

  const handleContextMenu = (e: React.MouseEvent, index: number) => {
    e.preventDefault()
    if (gameOver || win || grid[index].isOpen) return

    const newGrid = [...grid]
    newGrid[index].isFlagged = !newGrid[index].isFlagged
    setGrid(newGrid)
  }

  return (
    <GameLayout title="Siber Mayınlar" description="Güvenli veri bloklarını aç." score={score}>
      <div className="flex justify-center mb-4">
        <div className="text-xl font-bold text-red-500">{gameOver ? 'Sistem Çöktü!' : win ? 'Sistem Temizlendi!' : ''}</div>
      </div>

      <div 
        className="grid gap-1 bg-slate-900 p-4 rounded-xl border border-slate-800 mx-auto w-fit"
        style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))` }}
      >
        {grid.map((cell, i) => (
          <motion.div
            key={i}
            className={cn(
              "w-10 h-10 md:w-12 md:h-12 rounded flex items-center justify-center font-bold cursor-pointer select-none transition-all",
              cell.isOpen 
                ? (cell.isMine ? "bg-red-500/20 text-red-500 border-red-500" : "bg-slate-800/50 text-white border-slate-800") 
                : "bg-slate-700 hover:bg-slate-600 border-slate-600",
              "border"
            )}
            onClick={() => handleCellClick(i)}
            onContextMenu={(e) => handleContextMenu(e, i)}
            whileTap={{ scale: 0.95 }}
          >
            {cell.isOpen ? (
              cell.isMine ? '💣' : cell.neighborCount > 0 ? cell.neighborCount : ''
            ) : (
              cell.isFlagged ? '🚩' : ''
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button 
          onClick={initGame}
          className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-white shadow-lg shadow-red-600/20"
        >
          {gameOver ? 'Yeniden Başlat' : 'Sıfırla'}
        </button>
      </div>
    </GameLayout>
  )
}

