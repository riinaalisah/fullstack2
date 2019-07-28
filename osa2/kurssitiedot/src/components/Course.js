import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {

    const exs = []
    course.parts.map(function(part) {
        exs.push(part.exercises)
    })

  const reducer = (accumulator, current) => accumulator + current
  const total = exs.reduce(reducer)
    
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <p><b>Total of {total} exercises</b></p>
        </div>
    )
}

export default Course