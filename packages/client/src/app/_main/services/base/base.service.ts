import { ErrorCodes, HTTPError, Errors } from '@main/interfaces/http-error.interface';
import { catchError, throwError, OperatorFunction } from 'rxjs';
import { Injector } from '@angular/core';
import { SnackbarService } from '@main/services/snackbar/snackbar.service';
import { StoreService } from '../store/store.service';

/** Base service class to provide methods with error validation */
export abstract class BaseService<T extends Errors<string>> {
  /** Error codes dictionary */
  protected abstract errorCodes: ErrorCodes<T>;

  /** @ignore Service with methods to display snackbars on the screen */
  private _snackbarService: SnackbarService = this._injector.get(SnackbarService);

  /** @ignore Application storage provider service */
  private _storeService: StoreService = this._injector.get(StoreService);

  /** Application storage attached to this service */
  protected get store() {
    return this._storeService.store;
  }

  constructor(private _injector: Injector) {}

  /** Handle error code - display proper message in snackbar */
  protected handleErrorWithCode(err: HTTPError, code: T) {
    if (code) {
      const { message } = this.errorCodes[code];
      this._snackbarService.show(message, 'red');
    } else if (err.status === 500) {
      this._snackbarService.show($localize`Internal server error`, 'red');
    } else if (err.status === 503) {
      this._snackbarService.show($localize`Service is currently unavailable`, 'red');
    }
  }

  /** Validation operator function (uses provided errorCodes dictionary) */
  protected validate<E>(codeMappings: { [key in number | string]: T } = {}) {
    return catchError((err: HTTPError) => {
      const code = codeMappings[err.status || err.text];
      this.handleErrorWithCode(err, code);

      return throwError(() => err);
    }) as OperatorFunction<E, E>;
  }
}
