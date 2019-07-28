import React from 'react'

const CountryInfo = (props) => {

    const country = props.country.country
    const weather = props.weather

    const languages = country.languages.map(function(lang) {
        return <li key={lang.name}>{lang.name}</li>
    })

    return (
        <div>
            <h2>{country.name}</h2>
            <div>
                Capital: {country.capital}
            </div>
            <div>
                Population: {country.population}
            </div>
            <div>
                <h4>Languages</h4>
                <ul>
                    {languages}
                </ul>
            </div>
            <div>
                <img src={country.flag} width='150' height='100' />
            </div>
            <div>
                <h4>Weather in {country.capital}</h4>
                <div>
                    <b>Temperature:</b> {weather.current.temp_c}
                </div>
                <div>
                    <img src={weather.current.condition.icon}/>
                </div>
                <div>
                    <b>Wind:</b> {weather.current.wind_kph} kph direction {weather.current.wind_dir}
                </div>
            </div>
        </div>
    )
}

export default CountryInfo