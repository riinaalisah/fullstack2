import React from 'react'

const Person = (props) => {
    return (
        <div>
            {props.person.name} {props.person.number} 
            <button onClick={props.delete} value={props.person.name}>delete</button>
        </div>
    )
}

export default Person