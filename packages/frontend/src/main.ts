import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as dayjs from 'dayjs';

if (environment.production) {
  enableProdMode();
}

if (environment.disableConsoleLog && window) {
  window.console.log = () => {};
  window.console.info = () => {};
  window.console.warn = () => {};
  window.console.error = () => {};
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((ref) => {
    (window as any)['ngRef'] = ref;
  })
  .catch((err) => console.error(err));

const persistentLocale = localStorage.getItem('locale');
const userLocale = localStorage.getItem('userLocale');

if (persistentLocale && userLocale) {
  dayjs.updateLocale(userLocale, JSON.parse(persistentLocale));
  dayjs.locale(userLocale);
}
