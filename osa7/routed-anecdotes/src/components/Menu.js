import React from 'react'
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'
import AnecdoteList from './AnecdoteList'
import CreateNew from './CreateNew'
import About from './About'
import Anecdote from './Anecdote'
import Notification from './Notification'

const Menu = (props) => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Router>
        <div>
          <div>
            <Link style={padding} to='/anecdotes'>anecdotes</Link>
            <Link style={padding} to='/create'>create new</Link>
            <Link style={padding} to='/about'>about</Link>
          </div>
          <div>
            <Notification notification={props.notification} />
          </div>
          <Route exact path='/anecdotes' render={() =>
            <AnecdoteList anecdotes={props.anecdotes} />
          } />
          <Route exact path='/create' render={() => (
            props.notification === ''
            ? <CreateNew addNew={props.addNew} />
            : <Redirect to='/anecdotes' />
          )
          } />
          <Route exact path='/about' render={() =>
            <About />
          } />
          <Route exact path='/anecdotes/:id' render={({ match }) =>
            <Anecdote anecdote={props.anecdoteById(match.params.id)} />
          } />
        </div>
      </Router>
    </div>
  )
}

export default Menu