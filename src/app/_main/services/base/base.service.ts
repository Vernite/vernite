import { ErrorCodes, HTTPError, Errors } from '@main/interfaces/http-error.interface';
import { catchError, throwError, OperatorFunction } from 'rxjs';
import { Injector } from '@angular/core';
import { SnackbarService } from '@main/services/snackbar/snackbar.service';

export abstract class BaseService<T extends Errors<string>> {
  protected abstract errorCodes: ErrorCodes<T>;
  private _snackbarService: SnackbarService = this._injector.get(SnackbarService);

  constructor(private _injector: Injector) {}

  protected handleErrorWithCode(err: HTTPError, code: T) {
    const { message } = this.errorCodes[code];

    if (code) {
      this._snackbarService.show(message, 'red');
    }
  }

  protected validate<E>(codeMappings: { [key in number | string]: T }) {
    return catchError((err: HTTPError) => {
      const code = codeMappings[err.status || err.text];

      if (code) {
        this.handleErrorWithCode(err, code);
      }

      return throwError(() => err);
    }) as OperatorFunction<E, E>;
  }
}
