import React from 'react'
import PropTypes from 'prop-types'
import { Container, Button, Form } from 'semantic-ui-react'

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
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>username</label>
          <input
            type={username.type}
            value={username.value}
            onChange={username.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input
            type={password.type}
            value={password.value}
            onChange={password.onChange}
          />
        </Form.Field>
        <Button type='submit'>log in</Button>
      </Form>
    </Container>
  )
}

export default LoginForm