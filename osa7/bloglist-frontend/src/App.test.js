import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {

  test('if no user is logged, notes are note rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    const blogs = component.container.querySelectorAll('.blog')

    expect(component.getByText('login')).toBeDefined()
    expect(blogs.length).toBe(0)
  })

  test('if user is logged in, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Chester Tester'
    }

    await localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelectorAll('.blog')
    )
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(4)
    expect(component.container).toHaveTextContent('Test title 1')
    expect(component.container).toHaveTextContent('Test title 2')
    expect(component.container).toHaveTextContent('Test title 3')
    expect(component.container).toHaveTextContent('Test title 4')

  })

})