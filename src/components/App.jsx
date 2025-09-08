import React from 'react'
import SearchBar from '../containers/SearchBar.jsx'
import WeatherList from '../containers/WeatherList.jsx'

const App = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center mb-4">US City Weather Analytics</h1>
          <SearchBar />
          <WeatherList />
        </div>
      </div>
    </div>
  )
}

export default App
