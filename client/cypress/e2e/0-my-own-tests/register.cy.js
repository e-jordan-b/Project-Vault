describe('REGISTER tests', () => {
  it('displays an error message if the user doesnt enter a first name', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Sign Up').click();
    cy.get('input[name="lastName"]').type('newuserLast');
    cy.get('input[name="email"]').type('newuser@aa.com');
    cy.get('input[name="password"]').type('newuser123');
    cy.get('button').click();
    cy.contains('required');
  });

  it('displays an error message if the user doesnt enter a last name', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Sign Up').click();
    cy.get('input[name="firstName"]').type('newuserName');
    cy.get('input[name="email"]').type('kln@kjh.com');
    cy.get('input[name="password"]').type('newuser123');
    cy.get('button').click();
    cy.contains('required');
  });

  it('displays an error message if the user doesnt enter a email', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Sign Up').click();
    cy.get('input[name="firstName"]').type('newuserName');
    cy.get('input[name="lastName"]').type('newuserLast');
    cy.get('input[name="password"]').type('newuser123');
    cy.get('button').click();
    cy.contains('required');
  });

  it('displays an error message if the user doesnt enter a password', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Sign Up').click();
    cy.get('input[name="firstName"]').type('newuserName');
    cy.get('input[name="lastName"]').type('newuserLast');
    cy.get('input[name="email"]').type('hgkjh@ljh.com');
    cy.get('button').click();
    cy.contains('required');
  });

  it('displays a message if the user enters an email that is already registered', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Sign Up').click();
    cy.get('input[name="firstName"]').type('newuserName');
    cy.get('input[name="lastName"]').type('newuserLast');
    cy.get('input[name="email"]').type('tea@tea.com');
    cy.get('input[name="password"]').type('newuser123');
    cy.get('button').click();
    cy.contains('already registered');
  });

  // it('opens the app and registers', () => {
  //   cy.visit('http://localhost:3000');
  //   cy.contains('Sign Up').click();
  //   cy.get('input[name="firstName"]').type('newuserName');
  //   cy.get('input[name="lastName"]').type('newuserLast');
  //   cy.get('input[name="email"]').type('newuser@new.com');
  //   cy.get('input[name="password"]').type('newuser123');
  //   cy.contains('Log In').click();
  //   cy.contains('Home');
  // });
});
