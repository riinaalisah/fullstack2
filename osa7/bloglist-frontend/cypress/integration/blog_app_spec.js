/* eslint-disable no-undef */

describe('Blog list app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Tester',
      username: 'tester',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000/')
  })

  it('front page can be opened', function() {
    cy.contains('Log in to application')
  })

  it('user can login', function() {
    cy.get('#username').type('tester')
    cy.get('#password').type('secret')
    cy.get('#loginButton').click()
    cy.contains('Tester logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('secret')
      cy.get('#loginButton').click()
    })

    it('name of the user is shown', function() {
      cy.contains('Tester logged in')
    })

    it('users can be viewed', function() {
      cy.get('#usersInMenu').click()
      cy.contains('Users')
      cy.contains('Tester')
    })

    it('a new blog can be created', function() {
      cy.get('#blogsInMenu').click()
      cy.contains('new blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('testurl.com')
      cy.contains('create').click()
      cy.contains('Test title')
    })

    describe('when a blog is created', function() {
      beforeEach(function() {
        cy.get('#blogsInMenu').click()
        cy.contains('new blog').click()
        cy.get('#title').type('Test title')
        cy.get('#author').type('Test Author')
        cy.get('#url').type('testurl.com')
        cy.contains('create').click()
      })

      it('blog has correct info', function() {
        cy.get('#blogLink').click()
        cy.contains('testurl.com')
        cy.contains('0 likes')
        cy.contains('added by Tester')
      })

      it('blog can be liked', function() {
        cy.get('#blogLink').click()
        cy.contains('like').click()
        cy.contains('1 likes')
      })

      it('a comment can be added', function() {
        cy.get('#blogLink').click()
        cy.get('#commentInput').type('test comment')
        cy.contains('add comment').click()
        cy.contains('test comment')
      })

      it('users blog count increases by 1', function() {
        cy.get('#usersInMenu').click()
        cy.contains('1')
      })
    })
  })
})