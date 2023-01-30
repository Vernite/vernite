describe('Register tests', () => {
  beforeEach(() => {
    cy.logout();
    cy.visit('/auth/register');
  });

  it('Should not be able to use already taken username', () => {
    cy.contains('Register');

    cy.get('input[name=email]').type('admin@admin.com');
    cy.get('input[name=password]').type('a1234567');
    cy.get('input[name=repeatPassword]').type('a1234567');
    cy.contains('agree').click();

    cy.contains('Next').click();

    cy.get('input[name=username]').type('admin');
    cy.get('input[name=name]').type('admin');
    cy.get('input[name=surname]').type('admin');

    cy.get('button').contains('Register').click();

    cy.contains('Username is already taken');
  });

  it('Should not be able to use already taken email', () => {
    cy.contains('Register');

    cy.get('input[name=email]').type('marc999.02@wp.pl');
    cy.get('input[name=password]').type('a1234567');
    cy.get('input[name=repeatPassword]').type('a1234567');
    cy.contains('agree').click();

    cy.contains('Next').click();

    cy.get('input[name=username]').type('6584738726309');
    cy.get('input[name=name]').type('admin');
    cy.get('input[name=surname]').type('admin');

    cy.get('button').contains('Register').click();

    cy.contains('Email is already taken');
  });
});
