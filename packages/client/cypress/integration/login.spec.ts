import auth from '../fixtures/auth.json';

describe('Login tests', () => {
  beforeEach(() => {
    cy.logout();
    cy.visit('/auth/login');
  });

  it('Should be able to log in', () => {
    cy.contains('Log in');

    cy.get('input[name=email]').type(auth.login);
    cy.get('input[name=password]').type(auth.password);

    cy.get('button[type=submit]').click();

    cy.url().should('not.include', 'login');
  });

  it('Should be able to log in with email', () => {
    cy.contains('Log in');

    cy.get('input[name=email]').type(auth.email);
    cy.get('input[name=password]').type(auth.password);

    cy.get('button[type=submit]').click();

    cy.url().should('not.include', 'login');
  });

  it('Should be able to log in with remember me', () => {
    cy.contains('Log in');

    cy.get('input[name=email]').type(auth.login);
    cy.get('input[name=password]').type(auth.password);
    cy.get('input[name=remember]').click({ force: true });

    cy.get('button[type=submit]').click();

    cy.url().should('not.include', 'login');
  });

  it('Should not be able to log in with wrong password', () => {
    cy.contains('Log in');

    cy.get('input[name=email]').type(auth.login);
    cy.get('input[name=password]').type('123');

    cy.get('button[type=submit]').click();

    cy.url().should('include', 'login');
    cy.contains('Wrong');
  });

  afterEach(() => {
    cy.logout();
  });
});
