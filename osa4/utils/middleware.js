const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint '})
}

const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  
  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  try {
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      req.token = authorization.substring(7)
    }
  } catch(exception) {
    next(exception)
  }
  next()
}

module.exports = { unknownEndpoint, errorHandler, tokenExtractor }