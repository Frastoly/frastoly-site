'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import GameLayout from '@/components/shared/GameLayout'

// Grid Cell Type
interface Cell {
  id: number
  type: 'straight' | 'corner' | 't-shape' | 'cross' | 'source' | 'sink'
  rotation: number // 0, 90, 180, 270
  powered: boolean
  fixed?: boolean
}

export default function CircuitGame() {
  const [grid, setGrid] = useState<Cell[]>([])
  const [level, setLevel] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  const SIZE = 5

  // Simple level generator (mock)
  const generateLevel = () => {
    const newGrid: Cell[] = []
    for (let i = 0; i < SIZE * SIZE; i++) {
      const isSource = i === 0
      const isSink = i === SIZE * SIZE - 1
      
      newGrid.push({
        id: i,
        type: isSource ? 'source' : isSink ? 'sink' : Math.random() > 0.6 ? 'corner' : 'straight',
        rotation: Math.floor(Math.random() * 4) * 90,
        powered: isSource,
        fixed: isSource || isSink
      })
    }
    setGrid(newGrid)
    setIsComplete(false)
  }

  useEffect(() => {
    generateLevel()
  }, [])

  const rotateCell = (index: number) => {
    if (isComplete || grid[index].fixed) return
    
    const newGrid = [...grid]
    newGrid[index].rotation = (newGrid[index].rotation + 90) % 360
    setGrid(newGrid)
    
    checkPower(newGrid)
  }

  const checkPower = (currentGrid: Cell[]) => {
    // Mock logic for now
    const newGrid = currentGrid.map(c => ({...c, powered: c.type === 'source'}))
    setGrid(newGrid)
    
    // Check win condition (simple mock)
    const allPowered = newGrid.every(c => c.powered)
    if (allPowered) {
      setIsComplete(true)
      setLevel(l => l + 1)
    }
  }

  return (
    <GameLayout title="Devre Tamamlayıcı" description="Kabloları döndürerek enerjiyi ilet." score={level}>
      <div className="grid grid-cols-5 gap-2 max-w-md mx-auto bg-slate-900 p-4 rounded-xl border border-slate-800">
        {grid.map((cell, i) => (
          <motion.div
            key={i}
            className={cn(
              "aspect-square rounded-lg flex items-center justify-center cursor-pointer transition-colors",
              cell.powered ? "bg-amber-500/10 border border-amber-500/50" : "bg-slate-800 border border-slate-700",
              cell.fixed && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => rotateCell(i)}
            animate={{ rotate: cell.rotation }}
          >
            <div className={cn(
              "w-1/2 h-1 bg-current",
              cell.powered ? "bg-amber-400 shadow-[0_0_10px_#fbbf24]" : "bg-slate-600"
            )} />
            {cell.type === 'corner' && (
               <div className={cn(
                "absolute w-1 h-1/2 bottom-1/2 bg-current",
                cell.powered ? "bg-amber-400" : "bg-slate-600"
              )} />
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button 
          onClick={generateLevel}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-500 rounded-xl font-bold text-white"
        >
          Yeni Devre
        </button>
      </div>
    </GameLayout>
  )
}

