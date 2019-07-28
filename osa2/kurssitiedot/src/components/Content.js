import React from 'react'
import Part from './Part'

const Content = ({ parts }) => {

    return (
        <div>
            {parts.map(function(part, i) {
                return <Part part={part} key={i} />
            })}
        </div>
        
    )
    
}

export default Content