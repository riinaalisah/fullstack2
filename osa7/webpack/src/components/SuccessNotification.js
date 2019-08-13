import React from 'react'
import { Message } from 'semantic-ui-react'

const SuccessNotification = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <Message success>
      <Message.Header>{props.message}</Message.Header>
    </Message>
  )
}

export default SuccessNotification