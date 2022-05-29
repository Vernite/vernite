describe('Login tests', () => {
  beforeEach(() => {
    localStorage.clear();
    cy.visit('/auth/login');
  });

  it('Should be able to log in', () => {
    cy.contains('Log in');

    cy.get('input[name=email]').type('admin@admin.com');
    cy.get('input[name=password]').type('admin123');

    cy.get('button[type=submit]').click();

    cy.url().should('not.include', 'login');
  });

  it('Should be able to log in with remember me', () => {
    cy.contains('Log in');

    cy.get('input[name=email]').type('admin@admin.com');
    cy.get('input[name=password]').type('admin123');
    cy.get('input[name=remember]').click({ force: true });

    cy.get('button[type=submit]').click();

    cy.url().should('not.include', 'login');
  });

  it('Should not be able to log in with wrong password', () => {
    cy.contains('Log in');

    cy.get('input[name=email]').type('admin@admin.com');
    cy.get('input[name=password]').type('admin');

    cy.get('button[type=submit]').click();

    cy.url().should('include', 'login');
    cy.contains('Wrong');
  });
});
