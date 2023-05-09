import { getIdByUrl } from './getIdByUrl'

describe('getIdByUrl', () => {
  it('should extract the ID from a URL', () => {
    const url = 'https://swapi.dev/api/people/1/'
    expect(getIdByUrl(url)).toBe('1')
  })

  it('should return undefined if there is no ID in the URL', () => {
    const url = 'https://swapi.dev/api/people/'
    expect(getIdByUrl(url)).toBeUndefined()
  })

  it('should return undefined if the URL is empty', () => {
    expect(getIdByUrl('')).toBeUndefined()
  })
})