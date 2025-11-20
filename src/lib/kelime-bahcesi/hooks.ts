import { useState, useEffect } from 'react'

export function useWordList() {
  const [words, setWords] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch('/KelimeBahcesi/kelimeler.json')
        if (!response.ok) throw new Error('Kelimeler yüklenemedi')
        const data = await response.json()
        setWords(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }

    fetchWords()
  }, [])

  return { words, loading, error }
}

export interface Question {
  kategori: string
  soru: string
  cevap: string
}

export function useQuizQuestions() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch('/KelimeBahcesi/soru_havuzu_3000.json')
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return { questions, loading }
}

