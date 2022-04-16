import { createServer } from 'miragejs';
import { environment } from 'src/environments/environment';
import { workspacesMock, workspacesSeed } from './workspaces.mocks';

export function initMocks() {
  createServer({
    seeds(server) {
      workspacesSeed(server);
    },
    routes() {
      this.urlPrefix = environment.apiURL;

      workspacesMock(this);
    },
  });
}
