import weatherReducer from '../reducer_weather.js'
import { FETCH_WEATHER } from '../../actions/index.js'

describe('Weather Reducer', () => {
  it('should return initial state', () => {
    expect(weatherReducer(undefined, {})).toEqual([])
  })

  it('should handle FETCH_WEATHER action', () => {
    const mockWeatherData = {
      city: { name: 'New York' },
      list: [
        { main: { temp: 280, pressure: 1013, humidity: 60 } }
      ]
    }

    const action = {
      type: FETCH_WEATHER,
      payload: mockWeatherData
    }

    const newState = weatherReducer([], action)
    expect(newState).toHaveLength(1)
    expect(newState[0]).toEqual(mockWeatherData)
  })

  
  it('should add new weather data to existing state', () => {
    const initialState = [
      { city: { name: 'New York' }, list: [] }
    ]

    const newWeatherData = {
      city: { name: 'Los Angeles' },
      list: []
    }

    const action = {
      type: FETCH_WEATHER,
      payload: newWeatherData
    }

    const newState = weatherReducer(initialState, action)
    expect(newState).toHaveLength(2)
    expect(newState[0]).toEqual(newWeatherData)
    expect(newState[1]).toEqual(initialState[0])
  })

  it('should handle multiple cities with different weather data', () => {
    const cities = [
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

    let state = []
    cities.forEach(cityData => {
      const action = {
        type: FETCH_WEATHER,
        payload: cityData
      }
      state = weatherReducer(state, action)
    })

    expect(state).toHaveLength(3)
    expect(state[0].city.name).toBe('Chicago')
    expect(state[1].city.name).toBe('Los Angeles')
    expect(state[2].city.name).toBe('New York')
  })

  it('should handle cities with extreme weather conditions', () => {
    const extremeWeatherData = {
      city: { name: 'Phoenix', coord: { lat: 33.4484, lon: -112.0740 } },
      list: [
        { main: { temp: 310, pressure: 1005, humidity: 20 } }, // Hot and dry
        { main: { temp: 315, pressure: 1003, humidity: 15 } }
      ]
    }

    const action = {
      type: FETCH_WEATHER,
      payload: extremeWeatherData
    }

    const newState = weatherReducer([], action)
    expect(newState).toHaveLength(1)
    expect(newState[0].city.name).toBe('Phoenix')
    expect(newState[0].list[0].main.temp).toBe(310)
    expect(newState[0].list[0].main.humidity).toBe(20)
  })

  it('should handle coastal cities with high humidity', () => {
    const coastalWeatherData = {
      city: { name: 'Miami', coord: { lat: 25.7617, lon: -80.1918 } },
      list: [
        { main: { temp: 300, pressure: 1012, humidity: 85 } }, // High humidity
        { main: { temp: 302, pressure: 1010, humidity: 90 } }
      ]
    }

    const action = {
      type: FETCH_WEATHER,
      payload: coastalWeatherData
    }

    const newState = weatherReducer([], action)
    expect(newState).toHaveLength(1)
    expect(newState[0].city.name).toBe('Miami')
    expect(newState[0].list[0].main.humidity).toBe(85)
    expect(newState[0].list[1].main.humidity).toBe(90)
  })

  it('should handle mountain cities with low pressure', () => {
    const mountainWeatherData = {
      city: { name: 'Denver', coord: { lat: 39.7392, lon: -104.9903 } },
      list: [
        { main: { temp: 290, pressure: 850, humidity: 40 } }, // Low pressure (high altitude)
        { main: { temp: 285, pressure: 845, humidity: 35 } }
      ]
    }

    const action = {
      type: FETCH_WEATHER,
      payload: mountainWeatherData
    }

    const newState = weatherReducer([], action)
    expect(newState).toHaveLength(1)
    expect(newState[0].city.name).toBe('Denver')
    expect(newState[0].list[0].main.pressure).toBe(850)
    expect(newState[0].list[1].main.pressure).toBe(845)
  })

  it('should maintain order when adding multiple cities', () => {
    const cities = ['Seattle', 'Portland', 'San Francisco', 'Boston', 'Atlanta']
    let state = []

    cities.forEach(cityName => {
      const cityData = {
        city: { name: cityName, coord: { lat: 0, lon: 0 } },
        list: [{ main: { temp: 280, pressure: 1013, humidity: 60 } }]
      }
      const action = {
        type: FETCH_WEATHER,
        payload: cityData
      }
      state = weatherReducer(state, action)
    })

    expect(state).toHaveLength(5)
    // Should be in reverse order (newest first)
    expect(state[0].city.name).toBe('Atlanta')
    expect(state[1].city.name).toBe('Boston')
    expect(state[2].city.name).toBe('San Francisco')
    expect(state[3].city.name).toBe('Portland')
    expect(state[4].city.name).toBe('Seattle')
  })
})
