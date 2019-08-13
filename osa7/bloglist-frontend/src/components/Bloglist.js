import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Notification from './Notification'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

import { useField } from '../hooks/useField'

import { setAndResetNotification } from '../reducers/notificationReducer'
import { addLike, createBlog, deleteBlog } from '../reducers/blogReducer'

import { Table, Container, Header } from 'semantic-ui-react'


const Bloglist = (props) => {

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const blogFormRef = React.createRef()

  const setSuccessMessage = (message) => {
    props.setAndResetNotification({
      message: message,
      type: 'success'
    })
  }

  const setErrorMessage = (message) => {
    props.setAndResetNotification({
      message: message,
      type: 'error'
    })
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
      await props.createBlog(blogObject)
      title.reset()
      author.reset()
      url.reset()
      setSuccessMessage(`A new blog '${blogObject.title}' by ${blogObject.author} was added`)
    } catch(exception) {
      setErrorMessage(exception.message)
    }
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          title={title}
          author={author}
          url={url}
          onSubmit={createBlog}
        />
      </Togglable>
    )
  }

  const sortByLikes = () => {
    props.blogs.sort((a, b) => {
      return b.likes - a.likes
    })
  }

  return (
    <Container>
      <Header as='h1'>Blog list</Header>
      <Notification type={props.notification.type} message={props.notification.message} />
      {blogForm()}
      {sortByLikes()}
      <Table striped>
        <Table.Body>
          {props.blogs.map(blog =>
            <Table.Row key={blog.id}>
              <Table.Cell>
                <Link id='blogLink' style={{ padding: 5 }} to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    loggedIn: state.loggedIn,
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  { addLike,
    setAndResetNotification,
    createBlog,
    deleteBlog
  })(Bloglist)