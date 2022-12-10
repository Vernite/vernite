declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, password: string): typeof login;
    logout(): typeof logout;
    createWorkspace(name: string): typeof createWorkspace;
    createProject(name: string): typeof createProject;
    deleteProject(id: number): typeof deleteProject;
    deleteWorkspace(id: number): typeof deleteWorkspace;
    deleteAllProjectsAndWorkspaces(): typeof deleteAllProjectsAndWorkspaces;
    clearUser(email: string, password: string): typeof clearUser;
  }
}

function requestWithAuth(
  { method, url, body }: { method: string; url: string; body?: any },
  fn?: (response: any) => void,
) {
  cy.getCookie('session').then((cookie) => {
    const cookieValue = cookie?.value;

    cy.request({
      method,
      url,
      body,
      headers: {
        Cookie: 'session=' + cookieValue,
      },
    }).then((res) => {
      fn?.(res);
    });
  });
}

function login(email: string, password: string) {
  cy.session([email, password, Math.random()], () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: { email, password },
    }).then(() => {
      localStorage.setItem('logged', 'true');
    });
    cy.wait(2000);
  });
}

function logout() {
  cy.getCookie('session').then((cookie) => {
    const cookieValue = cookie?.value;

    if (!cookieValue) return;

    cy.request({
      method: 'POST',
      url: '/api/auth/logout',
      headers: {
        Cookie: 'session=' + cookieValue,
      },
    }).then((res) => {
      cy.clearCookies();
      cy.clearLocalStorage();
    });
  });
}

function createWorkspace(name: string) {
  requestWithAuth({
    method: 'POST',
    url: '/api/workspace',
    body: { name },
  });
}

function createProject(name: string) {
  requestWithAuth({
    method: 'POST',
    url: '/api/project',
    body: { name },
  });
}

function deleteProject(id: number) {
  requestWithAuth({
    method: 'DELETE',
    url: `/api/project/${id}`,
  });
}

function deleteWorkspace(id: number) {
  requestWithAuth({
    method: 'DELETE',
    url: `/api/workspace/${id}`,
  });
}

function deleteAllProjectsAndWorkspaces() {
  requestWithAuth(
    {
      method: 'GET',
      url: '/api/workspace',
    },
    (response) => {
      response.body.forEach((workspace: any) => {
        workspace.projectsWithPrivileges.forEach((projectWithPrivileges: any) => {
          cy.deleteProject(projectWithPrivileges.project.id);
        });
        cy.deleteWorkspace(workspace.id);
      });
    },
  );
}

function clearUser(email: string, password: string) {
  cy.login(email, password);
  cy.deleteAllProjectsAndWorkspaces();
}

Cypress.Commands.add('login', login);
Cypress.Commands.add('logout', logout);
Cypress.Commands.add('createWorkspace', createWorkspace);
Cypress.Commands.add('createProject', createProject);
Cypress.Commands.add('deleteProject', deleteProject);
Cypress.Commands.add('deleteWorkspace', deleteWorkspace);
Cypress.Commands.add('deleteAllProjectsAndWorkspaces', deleteAllProjectsAndWorkspaces);
Cypress.Commands.add('clearUser', clearUser);
