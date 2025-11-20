'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWordList } from '@/lib/kelime-bahcesi/hooks'
import { cn } from '@/lib/utils'

type Difficulty = 'kolay' | 'orta' | 'zor'

interface ClassicGameProps {
  mode: 'CLASSIC' | 'CHAIN'
  onBack: () => void
}

const DIFFICULTY_SETTINGS = {
  kolay: { letterCount: 4, multiplier: 1 },
  orta: { letterCount: 6, multiplier: 1.5 },
  zor: { letterCount: 8, multiplier: 2 },
}

export default function ClassicGame({ mode, onBack }: ClassicGameProps) {
  const { words, loading, error } = useWordList()
  const [difficulty, setDifficulty] = useState<Difficulty>('orta')
  const [currentLetters, setCurrentLetters] = useState<string[]>([])
  const [foundWords, setFoundWords] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [input, setInput] = useState('')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null)
  const [chainLength, setChainLength] = useState(0)
  const [lastChainWord, setLastChainWord] = useState<string>('')
  const [flowerScale, setFlowerScale] = useState(1)

  // Helper to show temporary messages
  const showMessage = useCallback((text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 2000)
  }, [])

  // Initialize game round
  const startRound = useCallback(() => {
    if (!words.length) return

    const settings = DIFFICULTY_SETTINGS[difficulty]
    let validWords = words
    
    if (mode === 'CHAIN' && lastChainWord) {
      const lastChar = lastChainWord.slice(-1).toLocaleLowerCase('tr')
      validWords = words.filter(w => 
        w.toLocaleLowerCase('tr').startsWith(lastChar) && 
        w.length === settings.letterCount
      )
      
      if (validWords.length === 0) {
        // Fallback to regular words if chain cannot continue (or warn user)
        validWords = words.filter(w => w.length === settings.letterCount)
      }
    } else {
      validWords = words.filter(w => w.length === settings.letterCount)
    }

    if (validWords.length === 0) validWords = words // Fallback

    const randomWord = validWords[Math.floor(Math.random() * validWords.length)]
    const letters = randomWord.split('')
    
    // Fill if not enough letters
    const alphabet = "abcçdefgğhıijklmnoöprsştuüvyz"
    while (letters.length < settings.letterCount) {
      letters.push(alphabet[Math.floor(Math.random() * alphabet.length)])
    }

    // Shuffle
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }

    setCurrentLetters(letters)
    setFoundWords([])
    setInput('')
  }, [words, difficulty, mode, lastChainWord])

  // Initial start
  useEffect(() => {
    if (words.length > 0 && currentLetters.length === 0) {
      startRound()
    }
  }, [words, startRound, currentLetters.length])

  const handleLetterClick = (letter: string) => {
    // Simple append for now. Could implement "use each letter once" logic if strictly required, 
    // but original game just checked if letters exist in available set.
    // Actually original: `harflerKopya.splice(idx, 1)` implies one-to-one mapping.
    // So if we have two 'a's, we can use 'a' twice.
    
    // Current implementation just appends to input string.
    setInput(prev => prev + letter)
  }

  const checkWord = () => {
    const guess = input.toLocaleLowerCase('tr')
    
    if (guess.length < 2) {
      showMessage('En az 2 harfli olmalı', 'error')
      return
    }

    if (foundWords.includes(guess)) {
      showMessage('Bu kelimeyi zaten buldun', 'error')
      setInput('')
      return
    }

    // Check if word can be formed from current letters
    const available = [...currentLetters.map(l => l.toLocaleLowerCase('tr'))]
    for (const char of guess) {
      const idx = available.indexOf(char)
      if (idx === -1) {
        showMessage('Bu harflerle yazılamaz', 'error')
        setInput('')
        return
      }
      available.splice(idx, 1)
    }

    if (!words.includes(guess) && !words.includes(guess.toLocaleUpperCase('tr'))) { // Simple check
       // Note: words list case might vary. Original used .map(k => k.toLowerCase())
       // We should check against normalized list
       const exists = words.some(w => w.toLocaleLowerCase('tr') === guess)
       if (!exists) {
         showMessage('Sözlükte yok', 'error')
         setInput('')
         return
       }
    }

    // Chain check
    if (mode === 'CHAIN' && lastChainWord) {
      const lastChar = lastChainWord.slice(-1).toLocaleLowerCase('tr')
      if (guess[0] !== lastChar) {
        showMessage(`Kelime "${lastChar.toLocaleUpperCase('tr')}" ile başlamalı`, 'error')
        setInput('')
        return
      }
    }

    // Success
    const settings = DIFFICULTY_SETTINGS[difficulty]
    let earnedPoints = guess.length * 10 * settings.multiplier
    
    if (mode === 'CHAIN') {
      const newChain = chainLength + 1
      setChainLength(newChain)
      earnedPoints *= (1 + (newChain * 0.1))
      setLastChainWord(guess)
    }

    setScore(prev => prev + Math.floor(earnedPoints))
    setFoundWords(prev => [...prev, guess])
    showMessage(`+${Math.floor(earnedPoints)} Puan!`, 'success')
    setInput('')
    
    // Flower animation
    setFlowerScale(1.2)
    setTimeout(() => setFlowerScale(1), 300)

    // Check if we should advance (e.g. if main word found or certain % found)
    // Original logic: checks if chain can continue. 
    // Let's simplify: Classic mode continues on same letters until user refreshes or specific "Next Level" trigger?
    // Original: "Tüm kelimeleri buldunuz! Yeni harfler geliyor..."
    // Let's check if all possible words are found.
    
    const possibleWords = words.filter(w => {
      if (foundWords.includes(w.toLocaleLowerCase('tr')) || w.toLocaleLowerCase('tr') === guess) return false
      
      const tempLetters = [...currentLetters.map(l => l.toLocaleLowerCase('tr'))]
      for (const c of w.toLocaleLowerCase('tr')) {
        const idx = tempLetters.indexOf(c)
        if (idx === -1) return false
        tempLetters.splice(idx, 1)
      }
      return true
    })

    if (possibleWords.length === 0) {
      showMessage('Tüm kelimeler bulundu! Yeni tur...', 'success')
      setTimeout(startRound, 1500)
    } else if (mode === 'CHAIN') {
        // In chain mode, finding one valid word that continues chain allows moving to next round?
        // Original: "zincirIlerleVeyaBitir" checks if there are words for NEXT step.
        // But usually chain game means: Find word -> That word becomes base for next round?
        // Wait, original code:
        // `if (!zincirIlerleVeyaBitir()) return;`
        // It seems original code keeps SAME letters for multiple words? 
        // "zincirModu && sonKelime" logic in `rastgeleHarfler` suggests new letters are chosen based on previous word ONLY when `oyunBaslat` is called.
        // BUT `oyunBaslat` is called in `zincirModuDegistir` or initial load.
        // It seems original game stays on SAME letters until "Tüm kelimeleri buldunuz" OR manually restarted?
        // Let's look at original `kelimeGonder`:
        // `bulunanKelimeler.push`
        // `kelimeSayisiGoster()`
        // `zincirIlerleVeyaBitir()` -> just checks if next step is POSSIBLE.
        // `kalanKelimeler.length === 0` -> then `oyunBaslat()`.
        
        // So in original game, you find ALL words from CURRENT letters.
        // Chain constraint applies to order of finding words within the same set of letters?
        // OR does it carry over?
        // `zincirModu && sonKelime` is used in `rastgeleHarfler`.
        // So when `oyunBaslat` happens (new round), it uses `sonKelime` from PREVIOUS round to filter new words.
        // So yes, finish current set -> New set starts with last word of previous set.
        
        // So flow is:
        // 1. Get Letters
        // 2. Find words.
        // 3. If Chain mode, each word found must start with last char of previously found word?
        // Original `kelimeKontrol`: `if (zincirModu && sonKelime) { ... startsWith(sonHarf) }`
        // `sonKelime` is updated on every valid guess.
        // So within the same bag of letters, you have to chain words?
        // E.g. Letters: A K L E M
        // Word 1: KALE -> sonKelime = KALE
        // Word 2: ELMA -> starts with E.
        // Word 3: ...
        
        // This implies a "Path" through the words in the current set.
        // That's interesting.
    }
  }
  
  const giveHint = () => {
    if (mode === 'CHAIN') {
      showMessage('Zincir modunda ipucu yok!', 'error')
      return
    }
    
    // Logic for hint...
    // Find a word not yet found
     const possibleWord = words.find(w => {
      if (foundWords.includes(w.toLocaleLowerCase('tr'))) return false
      const tempLetters = [...currentLetters.map(l => l.toLocaleLowerCase('tr'))]
      for (const c of w.toLocaleLowerCase('tr')) {
        const idx = tempLetters.indexOf(c)
        if (idx === -1) return false
        tempLetters.splice(idx, 1)
      }
      return true
    })
    
    if (possibleWord) {
      showMessage(`İpucu: ${possibleWord.slice(0,1)}...`, 'info')
      setScore(prev => Math.max(0, prev - 5)) // Penalty
    }
  }

  if (loading) return <div className="text-white text-center pt-20">Yükleniyor...</div>
  if (error) return <div className="text-red-500 text-center pt-20">Hata: {error}</div>

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 bg-slate-900/50 p-4 rounded-2xl backdrop-blur-md border border-white/10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Menü
        </button>
        
        <div className="flex gap-4">
          {(['kolay', 'orta', 'zor'] as const).map(d => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={cn(
                "px-4 py-1 rounded-lg text-sm font-semibold transition-all",
                difficulty === d 
                  ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20" 
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              )}
            >
              {d.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="text-amber-400 font-bold text-xl">
          {score} Puan
        </div>
      </div>

      {/* Game Area */}
      <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Flower */}
        <div className="absolute top-4 right-4 pointer-events-none opacity-50">
             <motion.div 
               animate={{ scale: flowerScale }}
               className="text-6xl"
             >
               🌸
             </motion.div>
        </div>

        {mode === 'CHAIN' && (
          <div className="mb-6 text-center">
             <div className="text-emerald-400 font-bold mb-2">Zincir Uzunluğu: {chainLength}</div>
             {lastChainWord && (
               <div className="text-white/60 text-sm">
                 Son Kelime: <span className="text-white font-bold">{lastChainWord}</span> 
                 {' '}(<span className="text-emerald-400 font-bold">{lastChainWord.slice(-1).toUpperCase()}</span> ile başlamalı)
               </div>
             )}
          </div>
        )}

        {/* Letters Grid */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 min-h-[80px]">
          {currentLetters.map((letter, idx) => (
            <motion.button
              key={`${idx}-${letter}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleLetterClick(letter)}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center text-2xl font-bold text-white shadow-lg hover:border-amber-400/50 hover:shadow-amber-500/20 transition-all"
            >
              {letter.toLocaleUpperCase('tr')}
            </motion.button>
          ))}
        </div>

        {/* Input Area */}
        <div className="max-w-md mx-auto relative mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkWord()}
            placeholder="Kelimeyi yazın..."
            className="w-full bg-slate-950/50 border-2 border-white/10 rounded-xl px-6 py-4 text-center text-2xl font-bold text-white placeholder:text-gray-600 focus:border-amber-500/50 focus:outline-none transition-colors"
          />
          <button
            onClick={checkWord}
            className="absolute right-2 top-2 bottom-2 px-6 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-colors"
          >
            ✓
          </button>
        </div>

        {/* Message */}
        <div className="h-8 text-center mb-6">
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={cn(
                  "font-bold text-lg",
                  message.type === 'error' ? 'text-red-400' : 
                  message.type === 'success' ? 'text-green-400' : 'text-blue-400'
                )}
              >
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
                setCurrentLetters([]) // Trigger restart via useEffect
                startRound()
            }}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-colors"
          >
            Karıştır / Yeni
          </button>
          <button
            onClick={giveHint}
            disabled={mode === 'CHAIN'}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-colors disabled:opacity-50"
          >
            İpucu
          </button>
        </div>

        {/* Found Words */}
        <div className="mt-8 pt-6 border-t border-white/10">
           <h3 className="text-gray-400 text-sm font-semibold mb-4 text-center uppercase tracking-wider">Bulunan Kelimeler</h3>
           <div className="flex flex-wrap justify-center gap-2">
             {foundWords.map((w, i) => (
               <span key={i} className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm border border-emerald-500/30">
                 {w}
               </span>
             ))}
             {foundWords.length === 0 && (
               <span className="text-gray-600 text-sm italic">Henüz kelime bulunamadı</span>
             )}
           </div>
        </div>

      </div>
    </motion.div>
  )
}

