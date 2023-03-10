/* eslint-disable no-undef */
describe('Initialize', () => {
  const person1 = {
    name: 'Terrence J. Kaufman',
    number: '303-6206309',
  }
  const person2 = {
    name: 'Zelda G. Owings',
    number: '425-4916897',
  }

  beforeEach(() => {
    cy.request('POST', 'http://localhost:8000/api/testing/reset')
    cy.request('POST', 'http://localhost:8000/api/persons', person1)
    cy.request('POST', 'http://localhost:8000/api/persons', person2)
  })
})

describe('Phonebook app', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:8000')
    cy.contains('Phonebook')
  })
})

/* describe('Add Form', () => {
  it('succeeds with correct inputs', () => {
    cy.visit('http://localhost:8000')
      .then(async () => {
        await cy.get('input[name=name]').type(user.username)
        await cy.get('input[name=password]').type(user.password)
        await cy.get('#login-btn').click()
      })
      .then(async () => {
        await cy.contains(`${user.name} logged in`)
        await cy.get('.success').should('be.visible')
        await cy
          .get('[data-testid="success-msg"]')
          .should('contain', 'login successful')
      })
  })

  it('fails with wrong credentials e.g. password', () => {
    cy.visit('http://127.0.0.1:3000')
      .then(async () => {
        await cy.get('input[name=username]').type(user.username)
        await cy.get('input[name=password]').type('secret')
        await cy.get('#login-btn').click()
        await cy.contains('invalid username or password!')
      })
      .then(async () => {
        await cy.get('.error').should('be.visible')
        await cy
          .get('[data-testid="error-msg"]')
          .should('contain', 'invalid username or password!')
      })
  })

  it('fails with wrong credentials e.g. username', () => {
    cy.visit('http://127.0.0.1:3000')
      .then(async () => {
        await cy.get('input[name=username]').type('username')
        await cy.get('input[name=password]').type(user.password)
        await cy.get('#login-btn').click()
        await cy.contains('invalid username or password!')
      })
      .then(async () => {
        await cy.get('.error').should('be.visible')
        await cy
          .get('[data-testid="error-msg"]')
          .should('contain', 'invalid username or password!')
      })
  })
}) */
