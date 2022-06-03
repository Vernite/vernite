import auth from '../fixtures/auth.json';

describe('Projects tests', () => {
  before(() => {
    cy.logout();
    cy.login(auth.email, auth.password);
    cy.createWorkspace('Test workspace');
    cy.visit('/');
  });

  beforeEach(() => {
    cy.logout();
    cy.login(auth.email, auth.password);
    cy.visit('/');
  });

  it('Should be able to create a new project', () => {
    cy.contains('Test workspace').click();
    cy.contains('New project').click();
    cy.get('input[name=name]').type('Test project');
    cy.get('button[type=submit]').dblclick();
  });

  it('Should not be able to create a new project without name', () => {
    cy.contains('Test workspace').click();
    cy.contains('New project').click();
    cy.get('button[type=submit]').click();
    cy.contains('is required');
  });

  it('Should be able to edit a project', () => {
    cy.contains('Test workspace').click();
    cy.contains('tr', 'Test project').find('.mat-menu-trigger').click();
    cy.contains('Edit').click();
    cy.get('input[name=name]').clear().type('Test project - renamed');
    cy.contains('Save').click();
    cy.contains('Test project - renamed');
  });

  it('Should be able to delete a project', () => {
    cy.contains('Test workspace').click();
    cy.contains('tr', 'Test project - renamed').find('.mat-menu-trigger').click();
    cy.contains('Delete').click();
    cy.get('.mat-dialog-container').contains('button', 'Delete').click();
    cy.contains('Test project - renamed').should('not.exist');
  });

  after(() => {
    cy.deleteAllProjectsAndWorkspaces();
  });
});
