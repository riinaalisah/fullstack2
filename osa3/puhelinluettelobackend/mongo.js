const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give arguments (password, name, number)')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb://puhelinluettelo:${password}@cluster0-shard-00-00-prugl.mongodb.net:27017,cluster0-shard-00-01-prugl.mongodb.net:27017,cluster0-shard-00-02-prugl.mongodb.net:27017/puhelinluettelo?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(response => {
    console.log(`Added ${name}, number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
