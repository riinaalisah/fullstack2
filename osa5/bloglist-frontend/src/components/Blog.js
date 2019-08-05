import React, { useState } from 'react'


const Blog = ({ blog, user, remove, onLike }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blog'>
      <div style={hideWhenVisible}
        onClick={toggleVisibility}
        className='minimalContent'>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible} className='allContent'>
        <div onClick={toggleVisibility}>
          {blog.title} {blog.author}
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes} likes <button onClick={onLike}>like</button>
        </div>
        <div>
          added by {blog.user.name}
        </div>
        {user.username === blog.user.username
          ? <button onClick={remove}>remove</button>
          : null
        }
      </div>
    </div>
  )
}

export default Blog