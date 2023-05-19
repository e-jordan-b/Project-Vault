import 'cypress-iframe'

describe('Donation process', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('#email').type('paola@test.com')
    cy.get('#password').type('test888')
    cy.contains('Log In').click()
    cy.contains('Read More').click()
  })
  it('Logs into a test account and finds the donate button', () => {
    cy.contains('Donate').click()
    cy.get('#amount').type(10);
    cy.contains('Donate')
  })

  it('Can return to the project if it changed its mind', () => {
    cy.contains('Donate').click()
    cy.get('#amount').type(10);
    cy.contains('X').click()
  })

  it('can not donate with empty fields and can go back to the project ', () => {
    cy.contains('Donate').click()
    cy.get('#amount').type(10);
    cy.contains('Donate').click()
    cy.wait(5000)
    cy.contains('X').click()
  })

})

