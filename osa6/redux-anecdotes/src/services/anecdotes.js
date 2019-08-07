import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (id) => {
  const response = await axios.get(baseUrl)
  const anecdotes = response.data
  const anecdoteToUpdate = anecdotes.find(a => a.id === id)
  const updatedAnecdote = {
    ...anecdoteToUpdate,
    votes: anecdoteToUpdate.votes + 1
  }
  await axios.put(`${baseUrl}/${anecdoteToUpdate.id}`, updatedAnecdote)
  return updatedAnecdote
}

export default { getAll, createNew, update }