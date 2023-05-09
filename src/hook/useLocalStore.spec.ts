import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from './useLocalStore'

interface Spies {
  [key: string]: jest.SpyInstance
}

describe('useLocalStorage', () => {
  const spies: Spies = {}

  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation(() => {});

    ['setItem', 'getItem', 'clear'].forEach((fn: string) => {
      const mock = jest.fn(localStorage[fn])
      spies[fn] = jest.spyOn(Storage.prototype, fn).mockImplementation(mock)
    })
  })

  afterEach(() => {
    Object.keys(spies).forEach((key: string) => spies[key].mockRestore())
    // jest.restoreAllMocks()
    localStorage.clear()
  })

  test('should set and get value from localStorage', () => {
    const key = 'test-key'
    const value = 'test-value'

    const { result } = renderHook(() => useLocalStorage(key, value))

    expect(result.current[0]).toBe(value)

    const newValue = 'new-value'
    act(() => {
      result.current[1](newValue)
    })

    expect(result.current[0]).toBe(newValue)
    expect(localStorage.getItem(key)).toBe(JSON.stringify(newValue))
  })

  test('should return undefined for unknown key without initial value', () => {
    const key = 'unknown-key'

    const { result } = renderHook(() => useLocalStorage(key))

    expect(result.current[0]).toBe(undefined)
    expect(localStorage.getItem(key)).toBe(null)
  })

  test('should return initial value for unknown key', () => {
    const key = 'unknown-key'
    const initialValue = 'initial-value'

    const { result } = renderHook(() => useLocalStorage(key, initialValue))

    expect(result.current[0]).toBe(initialValue)
    expect(spies.getItem).toHaveBeenCalledTimes(1)
    // expect(localStorage.getItem(key)).toBe(JSON.stringify(initialValue))
  })

  test('should handle errors when getting value from localStorage', () => {
    const key = 'test-key'
    const initialValue = 'initial-value'

    localStorage.setItem(key, '{invalid-json}')

    const { result } = renderHook(() => useLocalStorage(key, initialValue))

    expect(result.current[0]).toBe(initialValue)
    expect(console.error).toHaveBeenCalled()
  })

  test('should handle errors when setting value to localStorage', () => {
    const key = 'test-key'
    const value = 'test-value'

    const { result } = renderHook(() => useLocalStorage(key, value))

    expect(result.current[0]).toBe(value)

    const newValue = 'new-value'

    act(() => {
      result.current[1](newValue)
    })

    expect(result.current[0]).toBe(newValue)
    expect(console.error).toHaveBeenCalled()
  })

  test('should ignore storage event for different key', () => {
    const key = 'test-key'
    const value = 'test-value'
    const { result } = renderHook(() => useLocalStorage(key, value))

    expect(result.current[0]).toBe(value)

    act(() => {
      localStorage.setItem('other-key', JSON.stringify('other-value'))
      window.dispatchEvent(new Event('storage'))
    })

    expect(result.current[0]).toBe(value)
  })
})