const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  res.json(blog.toJSON())
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  try {
    const decodedToken = await jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    if (!blog.likes) {
      blog.likes = 0
    }
    if (!blog.title && !blog.url) {
      response.status(400).end()
    }

    const savedBlog = await blog.save()
    savedBlog.user = user
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const decodedToken = await jwt.verify(req.token, process.env.SECRET)
    const blogToRemove = await Blog.findById(req.params.id)

    if (decodedToken.id === blogToRemove.user.toString()) {
      await Blog.findByIdAndRemove(req.params.id)
      res.status(204).end()
    }
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body
  const user = await User.findById(body.user)

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    updatedBlog.user = user
    res.json(updatedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter