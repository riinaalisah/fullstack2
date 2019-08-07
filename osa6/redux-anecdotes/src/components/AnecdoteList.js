import React from 'react'
import { connect } from 'react-redux'
import Anecdote from "./Anecdote";
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
 
const AnecdoteList = (props) => {
  return (
    <div>
      {props.visibleAnecdotes.map(a =>
        <Anecdote
          key={a.id}
          anecdote={a}
          handleClick={() => {
            props.voteAnecdote(a.id)
            props.setNotification(`You voted '${a.content}'`, 5)
          }}
        />
      )}
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  const filtered = anecdotes.filter(a => 
    a.content.toLowerCase().includes(filter.toLowerCase()))
    return filtered.sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state),
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList