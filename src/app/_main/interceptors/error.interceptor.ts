import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '@main/services/dialog/dialog.service';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { UserService } from '@auth/services/user/user.service';
import dayjs from 'dayjs';
import { AuthService } from '@auth/services/auth/auth.service';

/**
 * Error interceptor
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private dialogService: DialogService,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
  ) {}

  /**
   * Flag to stop interception process
   */
  private _stoppedInterceptionProcess = false;

  /**
   * Construct error object from raw error object
   * @param e Raw error object
   * @returns Error object
   */
  constructError(e: any) {
    return {
      status: e?.status || 0,
      message: e?.error?.message || '',
    };
  }

  /**
   * Stop interception process
   */
  stopInterceptionProcess() {
    this._stoppedInterceptionProcess = true;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((e, obs) => {
        const error = this.constructError(e);

        if (error.status === 401) {
          this.stopInterceptionProcess();

          if (!this._stoppedInterceptionProcess) {
            this.dialogService.closeAll();
          }

          // User is deleted
          if (error.message === 'user deleted') {
            this.userService.clearCache();
            this.router.navigate(['/auth/delete-account']);
            return EMPTY;
          }

          // Session expired
          if (this.userService.isLocallyLogged()) {
            this.userService.clearCache();

            // If user was logged or was trying to login within one day, display session expired dialog
            if (
              this.authService.getLastLoginTryTime().diff(dayjs(), 'day') < 1 &&
              !this._stoppedInterceptionProcess
            ) {
              this.dialogService.openErrorDialog($localize`Your session has expired.`);
            }
          }

          // Redirect to login page
          this.router.navigate(['/auth/login']);
          return EMPTY;
        }

        return throwError(() => e);
      }),
    );
  }
}
