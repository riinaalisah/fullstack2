const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = array => {
  const likes = array.map(blog => blog.likes)
  const reducer = (sum, item) => {
    return sum + item
  }
  return array.length === 0
    ? 0
    : likes.reduce(reducer)

  
}

const favouriteBlog = array => {
  const likes = array.map(blog => blog.likes)
  const max = Math.max.apply(null, likes)

  return array.length === 0
    ? null
    : array.find(blog => blog.likes === max) 
}

const mostBlogs = array => {

  if (array.length === 0) {
    return null
  }

  const count = lodash.countBy(array, 'author')
  const entries = lodash.entries(count)
  const max = lodash.maxBy(entries, lodash.last)
  return ({
    'author': max[0],


    'blogs': max[1]
  })
  
}

const mostLikes = array => {
  if (array.length === 0) {
    return null
  }

  const uniques = lodash.uniqBy(array, 'author')
  const onlyAuthors = lodash.map(uniques, 'author')

  const sums = onlyAuthors.map(function(a) {
    return lodash.sumBy(array, function(o) {
      if (o.author === a) {
        return o.likes
      }
    })
  })

  const index = sums.indexOf(Math.max.apply(null, sums))
  return {
    'author': onlyAuthors[index],
    'likes': sums[index]
  }

}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}