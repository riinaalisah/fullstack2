const user = {
  username: 'tester',
  name: 'Tester'
}
// eslint-disable-next-line no-unused-vars
let token

const blogs = [
  {
    title: 'Test title 1',
    author: 'Test author 1',
    url: 'testurl1.com',
    likes: 4,
    user: user
  },
  {
    title: 'Test title 2',
    author: 'Test author 2',
    url: 'testurl2.com',
    likes: 12,
    user: user
  },
  {
    title: 'Test title 3',
    author: 'Test author 3',
    url: 'testurl3com',
    likes: 6,
    user: user
  },
  {
    title: 'Test title 4',
    author: 'Test author 4',
    url: 'testurl4.com',
    likes: 11,
    user: user
  }
]
const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken  }