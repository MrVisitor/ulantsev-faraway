import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Search from './search'

const setSearchParamsMock = jest.fn().mockImplementation(() => ({}))
const startValue = 'START VALUE'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => [
    new URLSearchParams({ page: '2', search: startValue }),
    setSearchParamsMock
  ]
}))

describe('Search component', () => {

  it('Value have to equal start value', () => {
    render(
      <Router>
        <Search />
      </Router>
    )
    const searchInput = screen.getByRole<HTMLInputElement>('textbox')
    expect(searchInput.value).toBe(startValue)
  })

  it('applies debounce to handleChange', async () => {
    render(
      <Router>
        <Search />
      </Router>
    )

    const searchInput = screen.getByRole<HTMLInputElement>('textbox')

    fireEvent.change(searchInput, { target: { value: 'A' } })
    fireEvent.change(searchInput, { target: { value: 'AB' } })
    fireEvent.change(searchInput, { target: { value: 'ABC' } })
    fireEvent.change(searchInput, { target: { value: 'ABCD' } })
  
    // // Wait for debounce time
    await waitFor(() => expect(setSearchParamsMock).toHaveBeenCalledTimes(1))
  })

})