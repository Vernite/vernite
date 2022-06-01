declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, password: string): typeof login;
    logout(): typeof logout;
    createWorkspace(name: string): typeof createWorkspace;
    createProject(name: string): typeof createProject;
    deleteProject(id: number): typeof deleteProject;
    deleteWorkspace(id: number): typeof deleteWorkspace;
    deleteAllProjectsAndWorkspaces(): typeof deleteAllProjectsAndWorkspaces;
    clearUser(): typeof clearUser;
  }
}

function login(email: string, password: string) {
  cy.request({
    method: 'POST',
    url: '/api/auth/login',
    body: { email, password },
  }).then((response) => {
    localStorage.setItem('logged', response.body.token);
  });
}

function logout() {
  cy.request({
    method: 'POST',
    url: '/api/auth/logout',
  }).then((response) => {
    localStorage.removeItem('logged');
  });
}

function createWorkspace(name: string) {
  cy.request({
    method: 'POST',
    url: '/api/workspaces',
    body: { name },
  });
}

function createProject(name: string) {
  cy.request({
    method: 'POST',
    url: '/api/projects',
    body: { name },
  });
}

function deleteProject(id: number) {
  cy.request({
    method: 'DELETE',
    url: `/api/projects/${id}`,
  });
}

function deleteWorkspace(id: number) {
  cy.request({
    method: 'DELETE',
    url: `/api/workspaces/${id}`,
  });
}

function deleteAllProjectsAndWorkspaces() {
  cy.request({
    method: 'GET',
    url: '/api/workspace',
  }).then((response) => {
    response.body.forEach((workspace: any) => {
      workspace.projectsWithPrivileges.forEach((projectWithPrivileges: any) => {
        deleteProject(projectWithPrivileges.project.id);
      });
      deleteWorkspace(workspace.id);
    });
  });
}

function clearUser() {
  deleteAllProjectsAndWorkspaces();
  logout();
}

Cypress.Commands.add('login', login);
Cypress.Commands.add('logout', logout);
Cypress.Commands.add('createWorkspace', createWorkspace);
Cypress.Commands.add('createProject', createProject);
Cypress.Commands.add('deleteProject', deleteProject);
Cypress.Commands.add('deleteWorkspace', deleteWorkspace);
Cypress.Commands.add('deleteAllProjectsAndWorkspaces', deleteAllProjectsAndWorkspaces);
Cypress.Commands.add('clearUser', clearUser);
