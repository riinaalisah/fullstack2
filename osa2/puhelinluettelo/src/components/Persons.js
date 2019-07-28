import React from 'react'
import Person from './Person'

const Persons = (props) => {

    const rows = () => props.persons.map(function(person) {
        if (person.name.toLowerCase().includes(props.search.toLowerCase())) {
          return <Person key={person.name} person={person} delete={props.delete} />
          }
        } 
    )
      
    return (
        <div>
            { rows() }
        </div> 
    )
}

export default Persons