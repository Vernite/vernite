import { Injectable } from '@angular/core';
import { Store } from '@main/libs/store/store.class';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public store = new Store();
}
