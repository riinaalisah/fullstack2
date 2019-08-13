import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'INIT_BLOGS':
    state = action.data
    return state
  case 'ADD_LIKE':
    return state.map(blog =>
      blog.id === action.data.id ? action.data : blog)
  case 'ADD_COMMENT':
    return state.map(blog =>
      blog.id === action.data.id ? action.data : blog)
  case 'DELETE_BLOG':
    return state
  case 'SET_BLOG':
    state = action.data
    return state
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const addLike = (blogObject) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blogObject)
    dispatch({
      type: 'ADD_LIKE',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (blogObject) => {
  return async dispatch => {
    await blogService.remove(blogObject)
    dispatch({
      type: 'DELETE_BLOG'
    })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.addComment(id, comment)
    dispatch({
      type: 'ADD_COMMENT',
      data: updatedBlog
    })
  }
}


export default blogReducer