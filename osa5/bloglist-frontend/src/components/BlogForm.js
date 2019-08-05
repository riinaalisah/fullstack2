import React from 'react'

const BlogForm = ({ title, author, url, onSubmit }) => {

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={onSubmit}>
        <div>
          title: <input
            type={title.type}
            value={title.value}
            onChange={title.onChange} />
        </div>
        <div>
          author: <input
            type={author.type}
            value={author.value}
            onChange={author.onChange} />
        </div>
        <div>
          url: <input
            type={url.type}
            value={url.value}
            onChange={url.onChange} />
        </div>
        <div>
          <button type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm