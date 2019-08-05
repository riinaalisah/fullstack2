import React from 'react'
import { render } from '@testing-library/react'
import Blog from './Blog'
import { fireEvent } from '@testing-library/react/dist'

describe('<Blog />', () => {
  let component
  let div1
  let div2

  const user = {
    username: 'tester',
    name: 'Tester'
  }

  const blog = {
    title: 'A Test Blog',
    author: 'Test Author',
    url: 'testurl.com',
    likes: 13,
    user: user
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} />
    )
    div1 = component.container.querySelector('.minimalContent')
    div2 = component.container.querySelector('.allContent')
  })

  test('renders correct content before clicking', () => {
    expect(div1).toHaveStyle('display: block')
    expect(div2).toHaveStyle('display: none')
  })

  test('renders correct content after clicking', () => {
    fireEvent.click(div1)
    expect(div1).toHaveStyle('display: none')
    expect(div2).toHaveStyle('display: block')
  })

})