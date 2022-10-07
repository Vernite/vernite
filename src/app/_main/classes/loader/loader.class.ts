import { interval, take, takeWhile } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoaderOptions } from './loader-options.interface';

export class Loader {
  public get pending() {
    return this._pending;
  }

  private _pending: boolean = false;
  private _pendingStart?: Date;

  public message?: string;

  constructor(private options: LoaderOptions = {}) {}

  public markAsPending() {
    this._pending = true;
    this._pendingStart = new Date();

    // Runtime checker for zombie loaders
    if (!environment.production) {
      interval(10000)
        .pipe(
          take(1),
          takeWhile(() => this._pending),
        )
        .subscribe(() => {
          throw new Error('Loader is pending for too long');
        });
    }
  }

  public markAsDone() {
    this._pending = false;
  }
}
