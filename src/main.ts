import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { createServer } from 'miragejs';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { workspacesMock, workspacesSeed } from './mocks/workspaces.mocks';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

createServer({
  seeds(server) {
    workspacesSeed(server);
  },
  routes() {
    this.urlPrefix = environment.apiURL;

    workspacesMock(this);
  },
});
