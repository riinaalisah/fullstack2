import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Table, Header } from 'semantic-ui-react'

const Users = (props) => {

  return (
    <Container>
      <Header as='h1'>Users</Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.users.map(user =>
            <Table.Row key={user.id}>
              <Table.Cell>
                <Link style={{ padding: 5 }} to={`/users/${user.id}`}>
                  {user.name}</Link>
              </Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
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
    users: state.users
  }
}

export default connect(mapStateToProps)(Users)