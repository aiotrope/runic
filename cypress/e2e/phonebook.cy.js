/* eslint-disable no-undef */
describe('Phonebook App', () => {
  const person1 = {
    name: 'Terrence J. Kaufman',
    number: '303-6206309',
  }
  const person2 = {
    name: 'Zelda G. Owings',
    number: '425-4916897',
  }

  const person3 = {
    name: 'Russell A. Yearwood',
    number: '31-3506949',
  }

  const updatePerson2 = {
    name: 'Zelda X. Owings',
    number: '310-00069490',
  }

  beforeEach(() => {
    cy.request('POST', 'http://localhost:8000/api/testing/reset')
    cy.request('POST', 'http://localhost:8000/api/persons', person1)
    cy.request('POST', 'http://localhost:8000/api/persons', person2)
  })

  describe('Initial', function () {
    it('front page can be opened', function () {
      cy.visit('http://localhost:8000')
      cy.contains('Phonebook')
      cy.contains(person1.name)
      cy.contains(person1.number)
      cy.contains(person2.name)
      cy.contains(person2.number)
    })
  })

  describe('Add, Update & Delete Person', () => {
    it('can add person with correct inputs', () => {
      cy.visit('http://localhost:8000')
        .then(async () => {
          await cy.get('input[name=name]').type(person3.name)
          await cy.get('input[name=number]').type(person3.number)
          await cy.get('#create-btn').click()
        })
        .then(async () => {
          cy.visit('http://localhost:8000')
          await cy.contains(person3.name)
          await cy.contains(person3.number)
        })
        .then(async () => {
          cy.visit('http://localhost:8000')
          await cy.contains(person2.name).click()
          await cy.contains(person2.name)
          await cy.contains(person2.number)
          await cy.get('input[name=name]').type(updatePerson2.name)
          await cy.get('input[name=number]').type(updatePerson2.number)
          await cy.get('#update-btn').click()
          await cy.get('#app-name').click()
        })
        .then(async () => {
          cy.visit('http://localhost:8000')
          await cy.contains(updatePerson2.name)
          await cy.contains(updatePerson2.number)
          await cy.get('#delete-btn').click()
        })
    })
  })

  describe('Updated List', () => {
    it('can update view', () => {
      cy.visit('http://localhost:8000').then(async () => {
        cy.contains('#name-link', person3.name).should('not.exist')
      })
    })
  })
})
