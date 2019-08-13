import React from 'react'
import { Message } from 'semantic-ui-react'

const ErrorNotification = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <Message negative>
      <Message.Header>{props.message}</Message.Header>
    </Message>
  )
}

export default ErrorNotification