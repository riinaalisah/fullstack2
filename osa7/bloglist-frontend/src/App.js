import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import Bloglist from './components/Bloglist'
import Blog from './components/Blog'
import Home from './components/Home'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

import { useField } from './hooks/useField'

import { setAndResetNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { loginUser, logoutUser } from './reducers/loginReducer'

import { Container, Menu, Button } from 'semantic-ui-react'

const App = (props) => {

  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    props.initializeUsers()
  }, [props.users])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.loginUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      props.loginUser(user)
    } catch(exception) {
      props.setAndResetNotification({
        message: 'Wrong username or password',
        type: 'error'
      })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    props.logoutUser()
  }

  const userById = (id) =>
    props.users.find(user => user.id === id)

  const blogsByUserId = (id) =>
    props.blogs.filter(blog => blog.user.id === id)

  const blogById = (id) =>
    props.blogs.find(blog => blog.id === id)

  if (props.loggedIn === null) {
    return (
      <Container>
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
        />
      </Container>
    )
  }

  return (
    <Container>
      <Router>
        <div>
          <Menu>
            <Menu.Item name='blogs' id='blogsInMenu'>
              <Link style={{ padding: 5 }} to='/blogs'>blogs</Link>
            </Menu.Item>
            <Menu.Item name='users' id='usersInMenu'>
              <Link style={{ padding: 5 }} to='/users'>users</Link>
            </Menu.Item>
            <Menu.Item name='logged in'>
              {props.loggedIn.name} logged in
              <Button onClick={handleLogout}>logout</Button>
            </Menu.Item>
          </Menu>
          <Route exact path='/' render={() => <Home />} />
          <Route exact path='/login' render={() =>
            props.loggedIn ? <Redirect to='/' /> : <LoginForm
              username={username}
              password={password}
              handleSubmit={handleLogin}
            />
          } />
          <Route exact path='/blogs' render={() =>
            <Bloglist handleLogout={handleLogout} />
          } />
          <Route exact path='/users' render={() => <Users /> } />
          <Route exact path='/users/:id' render={({ match }) =>
            <User user={userById(match.params.id)} blogs={blogsByUserId(match.params.id)} />
          } />
          <Route exact path='/blogs/:id' render={({ match }) =>
            <Blog blog={blogById(match.params.id)} />
          } />
        </div>
      </Router>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    loggedIn: state.loggedIn,
    notification: state.notification,
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  { initializeBlogs,
    initializeUsers,
    setAndResetNotification,
    loginUser,
    logoutUser })(App)