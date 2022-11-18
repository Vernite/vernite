import { environment } from 'src/environments/environment';
import { LoaderOptions } from './loader-options.interface';

export class Loader {
  public get pending() {
    return this._pending;
  }

  private _pending: boolean = false;
  private _pendingStart?: Date;
  private _timeout?: any;

  public message?: string;

  constructor(private options: LoaderOptions = {}) {}

  public markAsPending() {
    if (this._pending) return;

    this._pending = true;
    this._pendingStart = new Date();

    // Runtime checker for zombie loaders
    if (!environment.production) {
      this._timeout = setTimeout(() => {
        if (this._pending) {
          console.error('Loader is pending for longer than 10 seconds', this);
        }
      }, 10000);
    }
  }

  public markAsDone() {
    if (!this._pending) return;

    const finish = () => {
      this._pending = false;
      this._pendingStart = undefined;
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
    };

    const totalTimeOfPending = this._pendingStart?.getTime()
      ? new Date().getTime() - (this._pendingStart?.getTime() || 0)
      : 0;
    if (totalTimeOfPending < 1000) {
      setTimeout(() => {
        finish();
      }, 1000 - totalTimeOfPending);
    } else {
      finish();
    }
  }
}
