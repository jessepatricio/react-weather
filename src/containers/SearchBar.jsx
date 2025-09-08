import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchWeather } from '../actions/index.js'

const SearchBar = () => {
  const [term, setTerm] = useState('')
  const dispatch = useDispatch()

  const onInputChange = (event) => {
    setTerm(event.target.value)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    dispatch(fetchWeather(term))
    setTerm('')
  }

  return (
    <form onSubmit={onFormSubmit} className="input-group mb-4">
      <input 
        placeholder="Get a 5-day forecast of your favorite cities"
        className="form-control"
        value={term}
        onChange={onInputChange}
      />
      <button type="submit" className="btn btn-secondary">
        Search
      </button>
    </form>
  )
}

export default SearchBar
