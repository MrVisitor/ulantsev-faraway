export const generateHexColorById = (id?: number): string => {
  const num = ((id || 1) * 173) % 10000
  const hex = num.toString(16).padStart(3, '0')
  return `#${hex}`
}