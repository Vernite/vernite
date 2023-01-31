import auth from '../fixtures/auth.json';

describe('Task tests', () => {
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

  it('Should be able to create a new task', () => {
    cy.contains('New task').click();
    cy.get('app-select[floatingLabel="Project"]').click();
    cy.get('app-option').contains('test project').click();
    cy.get('input[name=name]').type('Test task ' + rand);
    cy.get('button[type=submit]').contains('Create').click();
    cy.get('td').contains('test workspace').click();
    cy.get('td').contains('test project').click();
    cy.contains('Backlog').click();
    cy.contains('Test task ' + rand);
  });

  it('Should be able to edit a task', () => {
    cy.get('td').contains('test workspace').click();
    cy.get('td').contains('test project').click();
    cy.contains('Backlog').click();
    cy.contains('.row', 'Test task ' + rand)
      .find('.mat-menu-trigger')
      .click();
    cy.get('button').contains('Edit task').click();
    cy.get('input[name=name]')
      .clear()
      .type('Test task edited ' + rand);
    cy.get('button[type=submit]').contains('Save changes').click();
    cy.contains('Test task edited ' + rand);
  });

  it('Should be able to delete a task', () => {
    cy.get('td').contains('test workspace').click();
    cy.get('td').contains('test project').click();
    cy.contains('Backlog').click();
    cy.contains('.row', 'Test task edited ' + rand)
      .find('.mat-menu-trigger')
      .click();
    cy.get('button').contains('Delete task').click();
    cy.get('button').contains('Delete').click();
    cy.contains('Test task edited ' + rand).should('not.exist');
  });
});
