import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  credentials.username = credentials.username.value
  credentials.password = credentials.password.value
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }