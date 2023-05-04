/// <reference types="cypress" />

describe('Create project', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[id="email"]').type('vit@c.com');
    cy.get('input[id="password"]').type('123');
    cy.get('button[type="submit"]').click();
    cy.location('pathname').should('eq', '/home');
  });

  // it('should find the Create button', () => {
  //   cy.get('button[id="createButton"]');
  // });

  // it('should find the project creation form, fill out all the fields, and submit', () => {
  //   cy.get('button[id="createButton"]').click({ force: true });
  //   cy.contains('Your new project');
  //   cy.get('input[id="title"]').type('Cypress Cool Test');
  //   cy.get('[id="quill"]').type('Description for Cypress Cool Test');
  //   cy.fixture('unsplash.jpg', null).as('myFixture');
  //   cy.get('input[type=file]').selectFile('@myFixture');
  //   cy.get('input[id="tags"]').type('test cypress');
  //   cy.get('button[id="submit-new-project"]').click();
  //   cy.wait(5000);
  // });

  it('should find the project in /home and click "Read more"', () => {
    cy.get('<h1>Cypress Cool Test</h1>');
    cy.get('button[id="Cypress Cool Test"]').click({ multiple: true });
    cy.get('button[id="updateButton"]').click({ force: true });
    cy.contains('Update your project');
    cy.get('input[id="title"]').type('UPDATE Cypress Cool Test');
    cy.get('[id="update-quill"]').type('UPDATE ');
    cy.fixture('unsplash2.jpg', null).as('myFixture');
    cy.get('input[type=file]').selectFile('@myFixture');
    cy.get('input[id="video"]').type(
      'https://www.youtube.com/watch?v=HIFXZm_CERY'
    );
    cy.get('button[id="update-project"]').click();
    cy.wait(10000);
  });
});
