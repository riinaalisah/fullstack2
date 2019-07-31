const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
] 

const listWithFewBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Title1',
    author: 'Author 1',
    url: 'url1.com',
    likes: 6
  },
  {
    _id: '5a422aa71b54a676234d17f5',
    title: 'Title 2',
    author: 'Author 2',
    url: 'url2.com',
    likes: 13
  },
  {
    _id: '5a422aa71b54a676234d17f2',
    title: 'Title 3',
    author: 'Author 3',
    url: 'url3.com',
    likes: 2
  },
  {
    _id: '5a422aa71b54a676234d17f2',
    title: 'Title 4',
    author: 'Author 2',
    url: 'url4.com',
    likes: 8
  },
  {
    _id: '5a422aa71b54a676234d17f2',
    title: 'Title 5',
    author: 'Author 2',
    url: 'url5.com',
    likes: 4
  },
  {
    _id: '5a422aa71b54a676234d17f2',
    title: 'Title 6',
    author: 'Author 1',
    url: 'url6.com',
    likes: 7
  },
  {
    _id: '5a422aa71b54a676234d17f2',
    title: 'Title 7',
    author: 'Author 1',
    url: 'url7.com',
    likes: 2
  },

]

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
  })

  

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(listWithFewBlogs)).toBe(42)
  })

})

describe('favourite blog', () => {
    test('of empty list is zero', () => {
      expect(listHelper.favouriteBlog([])).toEqual(null)
    })

    test('when list has only one blog equals to that blog', () => {
      expect(listHelper.favouriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
    })

    test('of a bigger list is calculated right', () => {
      expect(listHelper.favouriteBlog(listWithFewBlogs)).toEqual(listWithFewBlogs[1])
    })
})

describe('most blogs', () => {
  test('of empty list returns null', () => {
    expect(listHelper.mostBlogs([])).toEqual(null)
  })

  test('when list has only one blog equals 1', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(listWithFewBlogs)
    expect(result).toEqual({ author: 'Author 1', blogs: 3 })
  })
})

describe('most likes', () => {
  test('of empty list returns null', () => {
    expect(listHelper.mostLikes([])).toEqual(null)
  })

  test('when list has only one blog is calculated right', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5})
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(listWithFewBlogs)
    expect(result).toEqual({ author: 'Author 2', likes: 25 })
  })
})