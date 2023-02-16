import { LoaderOptions } from './loader-options.interface';
import { environment } from './../../../../environments/environment';

/** Loader class to show progress spinner to the user */
export class Loader {
  /** Information about pending status - if loader should be visible */
  public get pending() {
    return this._pending;
  }

  /** Message assigned to loader */
  public message?: string;

  /** @ignore */
  private _pending: boolean = false;

  /** @ignore */
  private _pendingStart?: Date;

  /** @ignore */
  private _timeout?: any;

  /** @ignore */
  private _minTimeOfPending = 500;

  constructor(private options: LoaderOptions = {}) {}

  /** Marks loader as pending - changes pending status */
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
    if (totalTimeOfPending < this._minTimeOfPending) {
      setTimeout(() => {
        finish();
      }, this._minTimeOfPending - totalTimeOfPending);
    } else {
      finish();
    }
  }
}
