import React from 'react'
import PropTypes from 'prop-types'
import { Container, Button, Form, Header } from 'semantic-ui-react'

const LoginForm = ({
  username,
  password,
  handleSubmit
}) => {

  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  return (
    <Container>
      <Header as='h2'>Log in to application</Header>
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

export default LoginForm