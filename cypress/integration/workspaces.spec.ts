import auth from '../fixtures/auth.json';

describe('Workspaces tests', () => {
  const rand = Math.random();

  beforeEach(() => {
    cy.logout();
    cy.login(auth.email, auth.password);
    cy.visit('/workspaces');
  });

  it('Should be able to create a new workspace', () => {
    cy.contains('New workspace').click();
    cy.get('input[name=name]').type('Test workspace ' + rand);
    cy.contains('button[type=submit]', 'Save').dblclick();
    cy.contains('Test workspace ' + rand);
  });

  it('Should not be able to create a new workspace without name', () => {
    cy.contains('New workspace').click();
    cy.contains('button[type=submit]', 'Save').click();
    cy.contains('is required');
  });

  it('Should be able to edit a workspace', () => {
    cy.contains('tr', 'Test workspace ' + rand)
      .find('.mat-menu-trigger')
      .click();
    cy.contains('Edit').click();
    cy.get('input[name=name]')
      .clear()
      .type('Test workspace - renamed ' + rand);
    cy.contains('button[type=submit]', 'Save').click();
    cy.contains('Test workspace - renamed ' + rand);
  });

  it('Should be able to delete a workspace', () => {
    cy.contains('tr', 'Test workspace - renamed ' + rand)
      .find('.mat-menu-trigger')
      .click();
    cy.contains('Delete').click();
    cy.get('.mat-dialog-container').contains('button', 'Delete').click();
    cy.contains('Test workspace - renamed ' + rand).should('not.exist');
  });
});
