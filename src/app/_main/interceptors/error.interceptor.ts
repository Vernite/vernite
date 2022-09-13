import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '@main/services/dialog.service';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { UserService } from '@auth/services/user.service';
import { AuthService } from './../../auth/services/auth.service';
import dayjs from 'dayjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private dialogService: DialogService,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  private _stoppedInterceptionProcess = false;

  constructError(e: any) {
    return {
      status: e?.status || -1,
      message: e?.error?.message || ''
    };
  }

  stopInterceptionProcess() {
    this._stoppedInterceptionProcess = true;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((e, obs) => {
        const error = this.constructError(e);

        if (error.status === 401) {
          if (this._stoppedInterceptionProcess) return EMPTY;
          this.stopInterceptionProcess();

          this.dialogService.closeAll();

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
            if (this.authService.getLastLoginTime().diff(dayjs(), 'day') < 1) {
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
