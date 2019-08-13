import React from 'react'
import SuccessNotification from './SuccessNotification'
import ErrorNotification from './ErrorNotification'

const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  if (props.type === 'success') {
    return (
      <SuccessNotification message={props.message} />
    )
  }

  if (props.type === 'error') {
    return (
      <ErrorNotification message={props.message} />
    )
  }

  return null
}

export default Notification