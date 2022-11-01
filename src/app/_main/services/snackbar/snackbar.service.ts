import { Injectable } from '@angular/core';
import { SnackbarData } from '@main/components/snackbar/snackbar.interface';
import { Service } from '@main/decorators/service/service.decorator';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Service()
@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor() {}

  public snackbars$ = new BehaviorSubject<Map<string, SnackbarData>>(new Map());

  public show(message: string, color: SnackbarData['color'] = 'gray', duration: number = 4000) {
    const data = { message, duration, color };
    const uid = uuid();

    const map = this.snackbars$.value;
    map.set(uid, data);

    this.snackbars$.next(map);
  }

  public close(uid: string) {
    const map = this.snackbars$.value;
    map.delete(uid);
  }

  public closeAll() {
    this.snackbars$.next(new Map());
  }
}
