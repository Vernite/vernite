import { Server } from 'miragejs/server';
import { NO_CONTENT_PROVIDED, SUCCESS } from './helpers/response.mock.helper';

export function workspacesSeed(server: Server) {
  server.db.loadData({
    workspace: [{ name: 'Workspace 1' }, { name: 'Workspace 2' }, { name: 'Workspace 3' }],
  });
}

export function workspacesMock(server: Server) {
  server.get('/workspaces', (schema) => {
    return schema.db['workspace'];
  });

  server.post('/workspaces', (schema, request) => {
    const bodyString = request.requestBody;

    if (!bodyString) return NO_CONTENT_PROVIDED;
    const body = JSON.parse(bodyString);

    return schema.db['workspace'].insert(body);
  });

  server.get('/workspaces/:id', (schema, request) => {
    const id = request.params['id'];

    return schema.db['workspace'].find(id);
  });

  server.patch('/workspaces/:id', (schema, request) => {
    const bodyString = request.requestBody;
    const id = request.params['id'];

    if (!bodyString) return NO_CONTENT_PROVIDED;
    const body = JSON.parse(bodyString);

    return schema.db['workspace'].update(id, body);
  });

  server.delete('/workspaces/:id', (schema, request) => {
    const id = request.params['id'];

    schema.db['workspace'].remove(id);
    return SUCCESS;
  });
}
