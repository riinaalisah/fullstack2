import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Button = ({ handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Header = (props) => <h2>{props.text}</h2>

const Statistics = (props) => {
    if (props.total === 0) {
        return (
            <div><p>Ei yh'If it hurts, do it more often',
            'Adding manpower to a late software project makes it later!',
            'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
            'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
            'Premature optimization is the root of all evil.',
            'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
          tään palautetta annettu</p></div>
        )
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td><Statistic text='hyvä' /></td>
                        <td><Statistic value={props.good} /></td>
                    </tr>
                    <tr>
                        <td><Statistic text='neutraali' /></td>
                        <td><Statistic value={props.neutral} /></td>
                    </tr>
                    <tr>
                        <td><Statistic text='huono' /></td>
                        <td><Statistic  value={props.bad} /></td>
                    </tr>
                    <tr>
                        <td><Statistic text='yhteensä'/></td>
                        <td><Statistic  value={props.total} /></td>
                    </tr>
                    <tr>
                        <td><Statistic text='keskiarvo' /></td>
                        <td><Statistic value={props.average} /></td>
                    </tr>
                    <tr>
                        <td><Statistic text='positiivisia' /></td>
                        <td><Statistic value={props.positive} /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

const Statistic = ({ text, value }) => {
    return (
        <div>{text} {value}</div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)
    const [average, setAverage] = useState(0)
    const [positive, setPositive] = useState(0)


    const setValues = (type) => {
        setTotal(total + 1)
        if (type === 'hyvä') {
            setGood(good + 1)
            setAverage(average + 1)
            setPositive(positive + 1)
        } else if (type === 'huono') {
            setBad(bad + 1)
            setAverage(average - 1)
        } else {
            setNeutral(neutral + 1)
        }
    }
    
    return (
        <div>
            <Header text='anna palautetta' />
            <Button handleClick={() => setValues('hyvä')} text='hyvä'/>
            <Button handleClick={() => setValues('neutraali')} text='neutraali' />
            <Button handleClick={() => setValues('huono')} text='huono' />
            <Header text='statistiikka' />
            <Statistics good={good} neutral={neutral} bad={bad} total ={total}
             average={average / total} positive={Math.floor(positive / total * 100) + ' %'} />
        </div>
    )

}

ReactDOM.render(<App />, document.getElementById('root'));