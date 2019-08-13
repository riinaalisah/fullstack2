import React from 'react'
import { Form, Button } from 'semantic-ui-react'

const BlogForm = ({ title, author, url, onSubmit }) => {

  return (
    <div>
      <h3>Create a new blog</h3>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>title</label>
          <input
            id='title'
            type={title.type}
            value={title.value}
            onChange={title.onChange} />
        </Form.Field>
        <Form.Field>
          <label>author</label>
          <input
            id='author'
            type={author.type}
            value={author.value}
            onChange={author.onChange} />
        </Form.Field>
        <Form.Field>
          <label>url</label>
          <input
            id='url'
            type={url.type}
            value={url.value}
            onChange={url.onChange} />
        </Form.Field>
        <Button type='submit'>create</Button>
      </Form>
    </div>
  )
}

export default BlogForm