import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '@main/services/dialog.service';
import { catchError, EMPTY, Observable } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialogService: DialogService, private router: Router) {}

  private unauthorizedInARow = 0;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((e, obs) => {
        if (e.status === 401) {
          this.unauthorizedInARow++;

          if (this.unauthorizedInARow > 1) return EMPTY;
          this.dialogService.openErrorDialog($localize`Your session has expired.`);
          this.router.navigate(['/auth/login']);
        }

        return EMPTY;
      }),
    );
  }
}
