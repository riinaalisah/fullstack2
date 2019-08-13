import React from 'react'
import { render } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'
import { fireEvent } from '@testing-library/react/dist'

describe('<SimpleBlog />', () => {
  let component
  const onClick = jest.fn()

  const blog = {
    title: 'A Simple Blog',
    author: 'Author OfBlog',
    url: 'asimpleblog.com',
    likes: 23
  }

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog} onClick={onClick} />
    )
  })

  test('renders right content', () => {
    const titleAndAuthor = component.getByText('A Simple Blog Author OfBlog')
    const likes = component.getByText('blog has 23 likes')

    expect(titleAndAuthor).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('event handler is called twice after clicking like button twice', () => {
    const likeButton = component.container.querySelector('button')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(onClick.mock.calls.length).toBe(2)
  })

})