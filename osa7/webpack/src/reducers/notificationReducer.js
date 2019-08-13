const notificationReducer = (state = [null, null], action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    state = action.data
    return state
  case 'RESET_NOTIFICATION':
    state = [null, null]
    return state
  default:
    return state
  }

}

export const setAndResetNotification = (notification) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message: notification.message,
        type: notification.type
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION'
      })
    }, 5000)
  }
}


export default notificationReducer