import { useState, useEffect } from 'react'

type UseLocalStorageReturn<T> = [T | undefined, (value: T) => void]

function getFromLocalStorage<T>(key: string, initialValue?: T): T | undefined {
  try {
    const item = localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : initialValue
  } catch (error) {
    console.error(`Error retrieving value for key "${key}" from localStorage: ${error}`)
    return initialValue
  }
}

function useLocalStorage<T>(key: string, initialValue?: T): UseLocalStorageReturn<T> {
  const [ storedValue, setStoredValue ] = useState<T | undefined>(
    () => getFromLocalStorage<T>(key, initialValue)
  )

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error setting value for key "${key}" in localStorage: ${error}`)
    }
  }

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          const item = event.newValue
          setStoredValue(item ? (JSON.parse(item) as T) : initialValue)
        } catch (error) {
          console.error(`Error handling storage event for key "${key}" in localStorage: ${error}`)
        }
      }
    }

    window.addEventListener('storage', handleStorage)

    return () => window.removeEventListener('storage', handleStorage)
  }, [ initialValue, key ])

  return [ storedValue, setValue ]
}

export { useLocalStorage, getFromLocalStorage }