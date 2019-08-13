const loginReducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN_USER':
    state = action.data
    return state
  case 'LOGOUT_USER':
    state = null
    return state
  default:
    return state
  }
}

export const loginUser = (user) => {
  return {
    type: 'LOGIN_USER',
    data: user
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
  }
}

export default loginReducer