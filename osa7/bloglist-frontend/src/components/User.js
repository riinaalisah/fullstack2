import React from 'react'
import { Container, Header, List } from 'semantic-ui-react'

const User = ({ user, blogs }) => {
  if (!user) {
    return null
  }

  return (
    <Container>
      <Header as='h2'>{user.name}</Header>
      <Header as='h3'>Added blogs:</Header>
      <List bulleted>
        {blogs.map(blog =>
          <List.Item key={blog.id}>{blog.title}</List.Item>
        )}
      </List>
    </Container>
  )
}

export default User