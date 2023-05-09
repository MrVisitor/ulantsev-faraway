import { render, screen, fireEvent } from '@testing-library/react'
import { Pagination } from './pagination'
import { BrowserRouter as Router } from 'react-router-dom'

const setSearchParamsMock = jest.fn().mockImplementation(() => ({}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => [
    new URLSearchParams({ page: '2' }),
    setSearchParamsMock
  ]
}))

describe('Pagination component', () => {
  it('does not render the component if count is falsy', () => {
    render(
      <Router>
        <Pagination count={0} />
      </Router>
    )
    expect(screen.queryByRole('nav')).toBe(null)
  })

  it('renders a pagination component with the correct props and current page', () => {
    render(
      <Router>
        <Pagination count={3} />
      </Router>
    )

    const buttons = screen.getAllByRole('button')

    expect(buttons.length).toBe(5)

    const button = screen.getByLabelText('page 2', { selector: 'button' })

    expect(buttons).not.toBeUndefined()
    expect(button.classList.contains('Mui-selected')).toBe(true)
  })

  it('calls setSearchParams and scrolls to top when a page is clicked', () => {
    const scrollToMock = jest.fn()

    Object.defineProperty(window, 'scrollTo', { value: scrollToMock })

    render(
      <Router>
        <Pagination count={3} />
      </Router>
    )

    const button = screen.getByLabelText('page 2', { selector: 'button' })

    fireEvent.click(button)

    expect(setSearchParamsMock).toHaveBeenCalledTimes(1)
    expect(setSearchParamsMock).toHaveBeenCalledWith(expect.any(Function))

    expect(scrollToMock).toHaveBeenCalledTimes(1)
    expect(scrollToMock).toHaveBeenCalledWith(0, 0)
  })
})