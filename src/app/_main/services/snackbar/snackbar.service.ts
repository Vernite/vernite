import { Injectable } from '@angular/core';
import { SnackbarData } from '@main/components/snackbar/snackbar.interface';
import { Service } from '@main/decorators/service/service.decorator';
import { BehaviorSubject, map } from 'rxjs';
import { v4 as uuid } from 'uuid';

/**
 * Service to manage snackbars.
 */
@Service()
@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  /** Snackbars map */
  public snackbars$ = new BehaviorSubject<Map<string, SnackbarData>>(new Map());

  /** Snackbars list of entries */
  public snackbarsList$ = this.snackbars$.pipe(map((map) => Array.from(map.entries())));

  /**
   * Show snackbar
   * @param message message to show
   * @param color color of snackbar
   * @param duration duration of snackbar
   */
  public show(message: string, color: SnackbarData['color'] = 'gray', duration: number = 4000) {
    const data = { message, duration, color };
    const uid = uuid();

    const map = this.snackbars$.value;
    map.set(uid, data);

    this.snackbars$.next(map);
  }

  /**
   * Close snackbar
   * @param uid snackbar uid
   */
  public close(uid: string) {
    const map = this.snackbars$.value;
    map.delete(uid);
  }

  /**
   * Close all open snackbars
   */
  public closeAll() {
    this.snackbars$.next(new Map());
  }
}
