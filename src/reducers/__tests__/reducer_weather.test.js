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
      payload: { data: mockWeatherData }
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
      payload: { data: newWeatherData }
    }

    const newState = weatherReducer(initialState, action)
    expect(newState).toHaveLength(2)
    expect(newState[0]).toEqual(newWeatherData)
    expect(newState[1]).toEqual(initialState[0])
  })
})
