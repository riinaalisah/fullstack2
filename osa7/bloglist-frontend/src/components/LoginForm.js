import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Notification from '../components/Notification'
import { Container, Button, Form, Header } from 'semantic-ui-react'

const LoginForm = (props) => {

  const username = props.username
  const password = props.password
  const handleSubmit = props.handleSubmit

  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  return (
    <Container>
      <Header as='h2'>Log in to application</Header>
      <Notification type={props.notification.type} message={props.notification.message} />
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>username</label>
          <input
            id='username'
            type={username.type}
            value={username.value}
            onChange={username.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input
            id='password'
            type={password.type}
            value={password.value}
            onChange={password.onChange}
          />
        </Form.Field>
        <Button id='loginButton' type='submit'>log in</Button>
      </Form>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(LoginForm)