import { generateHexColorById } from './generateHexById'

describe('generateHexColorById', () => {
  test('should return a valid hex color string', () => {
    const id = 123
    const expected = '#4ff'
    const result = generateHexColorById(id)
    expect(result).toBe(expected)
  })

  test('should return a default color if id is undefined', () => {
    const id = undefined
    const expected = '#0ad'
    const result = generateHexColorById(id)
    expect(result).toBe(expected)
  })
})