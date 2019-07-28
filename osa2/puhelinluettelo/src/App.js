import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const foundPerson = persons.find(p => p.name === newName)
    if (foundPerson !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
        updatePerson(foundPerson)
      }
    } else {
      createPerson()
    }

  }

  const createPerson = (event) => {
    const personObject = {
      name: newName,
      number: newNumber
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotificationType('success')
        setNotificationMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        const el = document.createElement('html')
        el.innerHTML = error.response.data
        const parsed = el.getElementsByTagName('pre')[0].innerHTML
        
        setNotificationType('error')
        setNotificationMessage(parsed.split('<br>')[0])
        setTimeout(() => {
          setNotificationMessage(null)
        }, 7000)
      })
  }
  const updatePerson = (foundPerson) => {
    const updatedPerson = { ...foundPerson, number: newNumber}
    personService
      .update(foundPerson.id, updatedPerson)
      .then(returnedPerson => {
      setPersons(persons.map(p => p.id !== foundPerson.id ? p : returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotificationType('success')
        setNotificationMessage(`Information of ${foundPerson.name} was updated.`)
        
      })
      .catch(error => {
        setNotificationType('error')
        setNotificationMessage(`Information of ${foundPerson.name} has already been removed from the server.`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  const deletePerson = (event) => {
    if (window.confirm(`Delete ${event.target.value}?`)) {
      const personToDelete = persons.find(p => p.name === event.target.value)
      personService
        .deletePerson(personToDelete.id)
      setTimeout(function() {
        personService
          .getAll()
          .then(returned => {
            setPersons(returned)
          })
      }, 500)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <div>
        filter shown with <input
          value={search}
          onChange={handleSearchChange} />
      </div>
      <h2>Add a new</h2>
      <PersonForm name={newName} onNameChange={handleNameChange}
                  number={newNumber} onNumberChange={handleNumberChange}
                  onSubmit={addPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} delete={deletePerson} />
    </div>
  )

}

export default App