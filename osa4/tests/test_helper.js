const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'title 1',
    author: 'author 1', 
    url: 'url1.com',
    likes: 6
  },
  {
    title: 'title 2',
    author: 'author 2', 
    url: 'url2.com',
    likes: 14
  },
  {
    title: 'title 3',
    author: 'author 3', 
    url: 'url3.com',
    likes: 8
  }

]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethis' })
  await blog.save()
  await blog.remove()

  return blog.__id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}