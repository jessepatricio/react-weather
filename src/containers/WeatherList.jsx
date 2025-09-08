import React from 'react'
import { useSelector } from 'react-redux'
import Chart from '../components/Chart.jsx'
import GoogleMap from '../components/GoogleMap.jsx'

const WeatherList = () => {
  const weather = useSelector(state => state.weather)

  const renderWeather = (cityData) => {
    const name = cityData.city.name
    const temps = cityData.list.map(weather => weather.main.temp)
    const pressures = cityData.list.map(weather => weather.main.pressure)
    const humidities = cityData.list.map(weather => weather.main.humidity)
    const { lon, lat } = cityData.city.coord

    return (
      <tr key={name}>
        <td><GoogleMap lon={lon} lat={lat} /></td>
        <td><Chart data={pressures} color="green" units="hPa" /></td>
        <td><Chart data={humidities} color="black" units="%" /></td>
        <td><Chart data={temps} color="orange" units="C" /></td>
      </tr>
    )
  }

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>City</th>
          <th>Pressure (hPa)</th>
          <th>Humidity (%)</th>
          <th>Temperature (C)</th>
        </tr>
      </thead>
      <tbody>
        {weather.map(renderWeather)}
      </tbody>
    </table>
  )
}

export default WeatherList
