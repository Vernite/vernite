import auth from '../fixtures/auth.json';

describe('Projects tests', () => {
  const rand = Math.random();

  before(() => {
    cy.logout();
    cy.login(auth.email, auth.password);
  });

  beforeEach(() => {
    cy.logout();
    cy.login(auth.email, auth.password);
    cy.visit('/workspaces');
  });

  it('Should be able to create a new project', () => {
    cy.contains('td', 'test workspace ').click();
    cy.contains('New project').click();
    cy.get('input[name=name]').type('Test project ' + rand);
    cy.contains('button', 'Create project').click();
  });

  it('Should not be able to create a new project without name', () => {
    cy.contains('td', 'test workspace').click();
    cy.contains('button[type=submit]', 'New project').click();
    cy.wait(2000);
    cy.contains('button', 'Create project').click();
    cy.contains('is required');
  });

  it('Should be able to edit a project', () => {
    cy.contains('td', 'test workspace').click();
    cy.contains('tr', 'Test project ' + rand)
      .find('.mat-menu-trigger')
      .click();
    cy.contains('Edit').click();
    cy.get('input[name=name]')
      .clear()
      .type('Test project - renamed ' + rand);
    cy.contains('button', 'Save changes').click();
    cy.contains('Test project - renamed ' + rand);
  });

  it('Should be able to delete a project', () => {
    cy.contains('td', 'test workspace').click();
    cy.contains('tr', 'Test project - renamed ' + rand)
      .find('.mat-menu-trigger')
      .click();
    cy.contains('Delete').click();
    cy.get('.mat-dialog-container').contains('button', 'Delete').click();
    cy.contains('Test project - renamed ' + rand).should('not.exist');
  });
});
