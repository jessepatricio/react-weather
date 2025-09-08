import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxPromise from 'redux-promise'
import WeatherList from '../WeatherList.jsx'
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

describe('WeatherList Component', () => {
  it('renders weather table headers', () => {
    renderWithProvider(<WeatherList />)
    expect(screen.getByText('City')).toBeInTheDocument()
    expect(screen.getByText('Pressure (hPa)')).toBeInTheDocument()
    expect(screen.getByText('Humidity (%)')).toBeInTheDocument()
    expect(screen.getByText('Temperature (C)')).toBeInTheDocument()
  })

  it('renders empty table when no weather data', () => {
    renderWithProvider(<WeatherList />)
    expect(screen.getByText('City')).toBeInTheDocument()
    // Should not have any city data rows
    expect(screen.queryByText('New York')).not.toBeInTheDocument()
  })

  it('renders single city weather data', () => {
    const mockWeatherData = [
      {
        city: { name: 'New York', coord: { lat: 40.7128, lon: -74.0060 } },
        list: [
          { main: { temp: 280, pressure: 1013, humidity: 60 } },
          { main: { temp: 285, pressure: 1015, humidity: 65 } }
        ]
      }
    ]

    renderWithProvider(<WeatherList />, {
      initialState: { weather: mockWeatherData }
    })

    // Check for coordinates since GoogleMap shows fallback
    expect(screen.getByText(/40\.71/)).toBeInTheDocument()
    expect(screen.getByText(/-74\.01/)).toBeInTheDocument()
  })

  it('renders multiple cities weather data', () => {
    const mockWeatherData = [
      {
        city: { name: 'New York', coord: { lat: 40.7128, lon: -74.0060 } },
        list: [
          { main: { temp: 280, pressure: 1013, humidity: 60 } },
          { main: { temp: 285, pressure: 1015, humidity: 65 } }
        ]
      },
      {
        city: { name: 'Los Angeles', coord: { lat: 34.0522, lon: -118.2437 } },
        list: [
          { main: { temp: 295, pressure: 1010, humidity: 45 } },
          { main: { temp: 298, pressure: 1008, humidity: 50 } }
        ]
      },
      {
        city: { name: 'Chicago', coord: { lat: 41.8781, lon: -87.6298 } },
        list: [
          { main: { temp: 275, pressure: 1020, humidity: 70 } },
          { main: { temp: 278, pressure: 1018, humidity: 75 } }
        ]
      }
    ]

    renderWithProvider(<WeatherList />, {
      initialState: { weather: mockWeatherData }
    })

    // Check for coordinates and weather data
    expect(screen.getByText(/40\.71/)).toBeInTheDocument()
    expect(screen.getByText(/34\.05/)).toBeInTheDocument()
    expect(screen.getByText(/41\.88/)).toBeInTheDocument()
    expect(screen.getByText(/1014\s*hPa/)).toBeInTheDocument()
    expect(screen.getByText(/63\s*%/)).toBeInTheDocument()
    // Check that table structure is correct
    expect(screen.getByText('Temperature (C)')).toBeInTheDocument()
  })

  it('renders cities with extreme weather conditions', () => {
    const extremeWeatherData = [
      {
        city: { name: 'Phoenix', coord: { lat: 33.4484, lon: -112.0740 } },
        list: [
          { main: { temp: 310, pressure: 1005, humidity: 20 } }, // Hot and dry
          { main: { temp: 315, pressure: 1003, humidity: 15 } }
        ]
      }
    ]

    renderWithProvider(<WeatherList />, {
      initialState: { weather: extremeWeatherData }
    })

    // Check for coordinates and extreme weather values
    expect(screen.getByText(/33\.45/)).toBeInTheDocument()
    expect(screen.getByText(/-112\.07/)).toBeInTheDocument()
    expect(screen.getByText(/1004\s*hPa/)).toBeInTheDocument()
    expect(screen.getByText(/18\s*%/)).toBeInTheDocument()
    expect(screen.getByText(/39\s*C/)).toBeInTheDocument()
  })

  it('renders multiple cities with different weather patterns', () => {
    const weatherData = [
      { city: { name: 'Seattle', coord: { lat: 47.6062, lon: -122.3321 } }, list: [{ main: { temp: 280, pressure: 1013, humidity: 60 } }] },
      { city: { name: 'Miami', coord: { lat: 25.7617, lon: -80.1918 } }, list: [{ main: { temp: 300, pressure: 1012, humidity: 85 } }] }
    ]

    renderWithProvider(<WeatherList />, {
      initialState: { weather: weatherData }
    })

    // Check for multiple coordinate sets and weather data
    expect(screen.getByText(/47\.61/)).toBeInTheDocument()
    expect(screen.getByText(/25\.76/)).toBeInTheDocument()
    expect(screen.getByText(/1013\s*hPa/)).toBeInTheDocument()
    expect(screen.getByText(/1012\s*hPa/)).toBeInTheDocument()
  })

  it('handles cities with different coordinate formats', () => {
    const coordinateData = [
      {
        city: { name: 'New York', coord: { lat: 40.7128, lon: -74.0060 } },
        list: [{ main: { temp: 280, pressure: 1013, humidity: 60 } }]
      }
    ]

    renderWithProvider(<WeatherList />, {
      initialState: { weather: coordinateData }
    })

    // Check for coordinates and weather data
    expect(screen.getByText(/40\.71/)).toBeInTheDocument()
    expect(screen.getByText(/-74\.01/)).toBeInTheDocument()
    expect(screen.getByText(/1013\s*hPa/)).toBeInTheDocument()
  })

  it('handles cities with varying data lengths', () => {
    const varyingDataLength = [
      {
        city: { name: 'City1', coord: { lat: 0, lon: 0 } },
        list: [{ main: { temp: 280, pressure: 1013, humidity: 60 } }] // 1 data point
      },
      {
        city: { name: 'City2', coord: { lat: 1, lon: 1 } },
        list: [
          { main: { temp: 280, pressure: 1013, humidity: 60 } },
          { main: { temp: 285, pressure: 1015, humidity: 65 } },
          { main: { temp: 290, pressure: 1010, humidity: 70 } }
        ] // 3 data points
      }
    ]

    renderWithProvider(<WeatherList />, {
      initialState: { weather: varyingDataLength }
    })

    // Check for coordinates and weather data
    expect(screen.getByText(/0\.00/)).toBeInTheDocument()
    expect(screen.getByText(/1\.00/)).toBeInTheDocument()
    expect(screen.getAllByText(/1013\s*hPa/)).toHaveLength(2)
  })
})
