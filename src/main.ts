import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { initMocks } from './mocks/_main.mocks';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((ref) => {
    (window as any)['ngRef'] = ref;
  })
  .catch((err) => console.error(err));

initMocks();
