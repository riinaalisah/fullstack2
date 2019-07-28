import React from 'react'
import Country from './Country'

const Countries = (props) => {

    const countries = props.countries

    const rows = () => {
      return countries.map(function(country) {
        if (country !== undefined) {
          country = country.props.country
          return <Country key={country.name} country={country} />
        }
      })
    }

    return (
        <div>
            {rows()}
        </div>
    )
}

export default Countries