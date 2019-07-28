import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = (props) => {
    const parts = props.parts
    const obj1 = parts[0]
    const obj2 = parts[1]
    const obj3 = parts[2]
    console.log(obj1, obj2, obj3)
    return (
        <div>
            <Part name={obj1.name} exercises={obj1.exercises} />
            <Part name={obj2.name} exercises={obj2.exercises} />
            <Part name={obj3.name} exercises={obj3.exercises} />
        </div>
    )
}

const Total = (props) => {
    const parts = props.parts
    const obj1 = parts[0]
    const obj2 = parts[1]
    const obj3 = parts[2]
    return (
        <p> Yhteensä {obj1.exercises + obj2.exercises + obj3.exercises} tehtävää</p>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                exercises: 10
            },
            {
                name: 'Tiedonvälitys propseilla',
                exercises: 7
            },
            {
                name: 'Komponenttien tila',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
