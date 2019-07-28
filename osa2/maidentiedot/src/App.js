import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Country from './components/Country'
import CountryInfo from './components/CountryInfo'
import Countries from './components/Countries'

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState([])
  var current = []

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  useEffect(() => {
    axios
      .get(`http://api.apixu.com/v1/current.json?key=e9ba4f2d228948719e475226192307&q=${current.capital}`)
      .then(response => setWeather(response.data))
  }, [current])


  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const content = () => {
    var count = 0
    var index = 0
    const toReturn = countries.map(function(country) {
      if (country.name.toLowerCase().includes(search)) {
        count++
        current = country
        index = countries.indexOf(country)
        return <Country key={country.name} country={country} />
      }
    })
    
    if (count > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (count === 1) {
      return <CountryInfo country={toReturn[index].props} weather={weather} />
    } else {
      return <Countries countries={toReturn} />
    }
}

  return (
    <div>
      <div>
        Find countries <input 
          value={search}
          onChange={handleSearchChange}/>
      </div>
      <div>
        {content()}
      </div>
    </div>
  )
}
export default App;
