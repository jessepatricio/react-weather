import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxPromise from 'redux-promise'
import SearchBar from '../SearchBar.jsx'
import reducers from '../../reducers/index.js'

// Create a test store
const createTestStore = (initialState = {}) => {
  const createStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore)
  return createStoreWithMiddleware(reducers, initialState)
}

const renderWithProvider = (component, { initialState = {} } = {}) => {
  const store = createTestStore(initialState)
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  )
}

describe('SearchBar Component', () => {
  it('renders search input', () => {
    renderWithProvider(<SearchBar />)
    expect(screen.getByPlaceholderText('Get a 5-day forecast of your favorite cities')).toBeInTheDocument()
  })

  it('renders search button', () => {
    renderWithProvider(<SearchBar />)
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
  })

  it('updates input value when typing', () => {
    renderWithProvider(<SearchBar />)
    const input = screen.getByPlaceholderText('Get a 5-day forecast of your favorite cities')
    fireEvent.change(input, { target: { value: 'New York' } })
    expect(input.value).toBe('New York')
  })

  it('clears input after form submission', () => {
    renderWithProvider(<SearchBar />)
    const input = screen.getByPlaceholderText('Get a 5-day forecast of your favorite cities')
    const button = screen.getByRole('button', { name: 'Search' })
    
    fireEvent.change(input, { target: { value: 'New York' } })
    fireEvent.click(button)
    
    expect(input.value).toBe('')
  })
})
