const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('when there are initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.remove({})
  
    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('blogs are identified with field called id', async () => {
    const response = await api.get('/api/blogs')
    for (let blog of response.body) {
      await expect(blog.id).toBeDefined()
    }
  })

  describe('addition of a new blog', () => {

    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'new title',
        author: 'new author',
        url: 'newurl.com',
        likes: 8
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
    
      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).toContain('new title')
    })

    test('if likes is not defined, 0 is set', async () => {
      const newBlog = {
        title: 'new title',
        author: 'new author',
        url: 'newurl.com'
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
    
      const blogsAtEnd = await helper.blogsInDb()
      const likes = blogsAtEnd.map(b => b.likes)
      expect(likes).toContain(0)
    })

    test('if new blog does not contain title and url, 400 is returned', async () => {
      const newBlog = {
        author: 'new author',
        likes: 6
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
  })

  describe('deletion of a note', () => {
    test('succeeds with status 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)
      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).not.toContain(blogToDelete.title)
    })
  })

  describe('updating a blog', () => {
    test('updating blog likes succeeds', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      blogToUpdate.likes = 7

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
      const likes = blogsAtEnd.map(b => b.likes)
      expect(likes).toContain(7)
    })

    test('updating blog with invalid id fails', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      blogToUpdate.id = blogToUpdate.id + 'f'
      blogToUpdate.likes = 7

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(400)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})