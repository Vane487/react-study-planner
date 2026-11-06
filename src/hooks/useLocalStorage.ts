import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const savedValue = localStorage.getItem(key)
      return savedValue ? (JSON.parse(savedValue) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Якщо сховище браузера недоступне, застосунок продовжує працювати в пам'яті.
    }
  }, [key, value])

  return [value, setValue] as const
}
