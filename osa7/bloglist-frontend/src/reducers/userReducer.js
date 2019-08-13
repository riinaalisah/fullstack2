import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_USERS':
    state = action.data
    return state
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default userReducer
