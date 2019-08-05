import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import { useField } from './hooks/useField'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('')

  //const [title, setTitle] = useState('')
  const title = useField('text')
  //const [author, setAuthor] = useState('')
  const author = useField('text')
  //const [url, setUrl] = useState('')
  const url = useField('text')

  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setSuccessMessage = (message) => {
    setNotificationType('success')
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const setErrorMessage = (message) => {
    setNotificationType('error')
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const createBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    try {
      const savedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(savedBlog))
      //setTitle('')
     // setAuthor('')
      //setUrl('')
      setSuccessMessage(`A new blog '${savedBlog.title}' by ${savedBlog.author} was added`)
    } catch(exception) {
      setErrorMessage(exception.message)
    }
  }

  const addLike = async (blog) => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
      id: blog.id
    }

    try {
      const updatedBlog = await blogService.update(blogToUpdate)
      setBlogs(blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog))
    } catch(exception) {
      setErrorMessage(exception.message)
    }
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      try {
        await blogService.remove(blog)
        await setBlogs(await blogService.getAll())
        setSuccessMessage('Blog was removed successfully')
      } catch(exception) {
        setErrorMessage(exception.message)
      }
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
    } catch(exception) {
      setErrorMessage('Wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const loginForm = () => {
    return (
      <LoginForm
        username={username}
        password={password}
        handleSubmit={handleLogin}
      />
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          title={title}
          author={author}
          url={url}
          //onTitleChange={({ target }) => setTitle(target.value)}
          //onAuthorChange={({ target }) => setAuthor(target.value)}
          //onUrlChange={({ target }) => setUrl(target.value)}
          onSubmit={createBlog}
        />
      </Togglable>
    )
  }

  const sortByLikes = () => {
    blogs.sort((a, b) => {
      return b.likes - a.likes
    })
  }

  if (user === null) {
    return (
      <div>
        <h1>Bloglist</h1>
        <Notification message={notificationMessage} type={notificationType} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <div>
        <h1>Bloglist</h1>
        <Notification message={notificationMessage} type={notificationType} />
        <p>{user.name} logged in
          <button onClick={handleLogout}>logout</button></p>
      </div>
      <div>
        {blogForm()}
        <br></br>
      </div>
      <div>
        {sortByLikes()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user}
            onLike={() => addLike(blog)}
            remove={() => deleteBlog(blog)} />
        )}
      </div>
    </div>
  )
}

export default App
