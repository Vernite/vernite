import { ErrorCodes, HTTPError, Errors } from '@main/interfaces/http-error.interface';
import { catchError, throwError, OperatorFunction } from 'rxjs';
import { Injector } from '@angular/core';
import { SnackbarService } from '@main/services/snackbar/snackbar.service';

export abstract class BaseService<T extends Errors<string>> {
  protected abstract errorCodes: ErrorCodes<T>;
  private _snackbarService: SnackbarService = this._injector.get(SnackbarService);

  constructor(private _injector: Injector) {}

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

  protected validate<E>(codeMappings: { [key in number | string]: T }) {
    return catchError((err: HTTPError) => {
      const code = codeMappings[err.status || err.text];
      this.handleErrorWithCode(err, code);

      return throwError(() => err);
    }) as OperatorFunction<E, E>;
  }
}
