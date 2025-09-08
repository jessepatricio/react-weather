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

  it('handles multiple city searches', () => {
    renderWithProvider(<SearchBar />)
    const input = screen.getByPlaceholderText('Get a 5-day forecast of your favorite cities')
    const button = screen.getByRole('button', { name: 'Search' })
    
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']
    
    cities.forEach(city => {
      fireEvent.change(input, { target: { value: city } })
      fireEvent.click(button)
      expect(input.value).toBe('')
    })
  })

  it('handles city names with spaces', () => {
    renderWithProvider(<SearchBar />)
    const input = screen.getByPlaceholderText('Get a 5-day forecast of your favorite cities')
    const button = screen.getByRole('button', { name: 'Search' })
    
    const citiesWithSpaces = ['New York', 'Los Angeles', 'San Francisco', 'Las Vegas', 'Salt Lake City']
    
    citiesWithSpaces.forEach(city => {
      fireEvent.change(input, { target: { value: city } })
      fireEvent.click(button)
      expect(input.value).toBe('')
    })
  })

  it('handles form submission with Enter key', () => {
    renderWithProvider(<SearchBar />)
    const input = screen.getByPlaceholderText('Get a 5-day forecast of your favorite cities')
    
    fireEvent.change(input, { target: { value: 'Seattle' } })
    fireEvent.submit(input.closest('form')) // Submit the form instead of keyDown
    
    expect(input.value).toBe('')
  })

  it('handles different input formats', () => {
    renderWithProvider(<SearchBar />)
    const input = screen.getByPlaceholderText('Get a 5-day forecast of your favorite cities')
    const button = screen.getByRole('button', { name: 'Search' })
    
    const cityFormats = [
      'miami',           // lowercase
      'DENVER',          // uppercase
      '  Boston  ',      // with spaces
      'New-York',        // with hyphen
      'St. Louis'        // with period
    ]
    
    cityFormats.forEach(city => {
      fireEvent.change(input, { target: { value: city } })
      fireEvent.click(button)
      expect(input.value).toBe('')
    })
  })

  it('maintains input state during typing', () => {
    renderWithProvider(<SearchBar />)
    const input = screen.getByPlaceholderText('Get a 5-day forecast of your favorite cities')
    
    // Type a city name character by character
    const cityName = 'Portland'
    for (let i = 0; i < cityName.length; i++) {
      fireEvent.change(input, { target: { value: cityName.substring(0, i + 1) } })
      expect(input.value).toBe(cityName.substring(0, i + 1))
    }
  })

  it('handles rapid successive searches', () => {
    renderWithProvider(<SearchBar />)
    const input = screen.getByPlaceholderText('Get a 5-day forecast of your favorite cities')
    const button = screen.getByRole('button', { name: 'Search' })
    
    const rapidCities = ['Atlanta', 'Miami', 'Dallas', 'Detroit', 'Minneapolis']
    
    rapidCities.forEach((city, index) => {
      fireEvent.change(input, { target: { value: city } })
      fireEvent.click(button)
      expect(input.value).toBe('')
    })
  })
})
