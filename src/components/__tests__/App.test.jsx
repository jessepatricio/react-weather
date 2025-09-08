import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxPromise from 'redux-promise'
import App from '../App.jsx'
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

describe('App Component', () => {
  it('renders the app title', () => {
    renderWithProvider(<App />)
    expect(screen.getByText('US City Weather Analytics')).toBeInTheDocument()
  })

  it('renders search bar', () => {
    renderWithProvider(<App />)
    expect(screen.getByPlaceholderText('Get a 5-day forecast of your favorite cities')).toBeInTheDocument()
  })

  it('renders weather table headers', () => {
    renderWithProvider(<App />)
    expect(screen.getByText('City')).toBeInTheDocument()
    expect(screen.getByText('Pressure (hPa)')).toBeInTheDocument()
    expect(screen.getByText('Humidity (%)')).toBeInTheDocument()
    expect(screen.getByText('Temperature (C)')).toBeInTheDocument()
  })
})
