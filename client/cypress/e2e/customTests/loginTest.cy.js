describe('LOG IN tests', () => {
  it('opens the app and logs in', () => {
    cy.visit('/');
    cy.get('input[name="email"]').type('tea@tea.com');
    cy.get('input[name="password"]').type('tea123');
    cy.contains('Log In').click();
    cy.contains('Home');
  });

  it('displays an error message if the user doesnt enter a password', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[name="email"]').type('aa@aa.com');
    cy.contains('Log In').click();
    cy.contains('required');
  });

  it('displays an error message if the user doesnt enter a email', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[name="password"]').type('tea123');
    cy.contains('Log In').click();
    cy.contains('required');
  });

  it('error for wrong credentials', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[name="email"]').type('tea@team.com');
    cy.get('input[name="password"]').type('tea123');
    cy.contains('Log In').click();
    cy.contains('Invalid');
  });
});
