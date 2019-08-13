import React from 'react'
import { connect } from 'react-redux'
import { setAndResetNotification } from '../reducers/notificationReducer'
import { addLike, addComment } from '../reducers/blogReducer'
import { useField } from '../hooks/useField'
import { Container, Header, Input, Button, List } from 'semantic-ui-react'

const Blog = (props) => {
  const comment = useField('text')
  const blog = props.blog

  if (!blog) {
    return null
  }

  const addLike = async (event) => {
    event.preventDefault()
    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
      id: blog.id
    }
    try {
      props.addLike(blogToUpdate)
      return
    } catch(exception) {
      props.setAndResetNotification({
        message: exception.message,
        type: 'error'
      })
    }
  }

  const addComment = async (event) => {
    event.preventDefault()
    await props.addComment(blog.id, comment.value)
    document.getElementById('commentInput').value = ''
    comment.reset()
  }

  return (
    <Container>
      <Header as='h2'>{blog.title} by {blog.author}</Header>
      <List>
        <List.Item>
          <List.Icon name='linkify' />
          <List.Content>{blog.url}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon verticalAlign='middle' name='thumbs up outline' />
          <List.Content>
            {props.blog.likes} likes
            <Button onClick={addLike}>like</Button>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='user outline' />
          <List.Content>added by {blog.user.name}</List.Content>
        </List.Item>
      </List>
      <Header as='h3'>Comments</Header>
      <div>
        <Input id='commentInput' type={comment.type} onChange={comment.onChange} />
        <Button onClick={addComment}>add comment</Button>
      </div>
      <List bulleted>
        {blog.comments.map(comment =>
          <List.Item key={blog.comments.indexOf(comment)}>{comment}</List.Item>
        )}
      </List>
    </Container>
  )
}


export default connect(null, { addLike, addComment, setAndResetNotification })(Blog)