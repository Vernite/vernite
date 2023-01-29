import { Injectable } from '@angular/core';
import { Store } from '@main/libs/store/store.class';

/**
 * Store service
 */
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  /** Application storage */
  public store = new Store();
}
