import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogService } from '@main/services/dialog.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialogService: DialogService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((e, obs) => {
        this.handleError(e);
        return of();
      }),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status >= 200 && event.status < 300) {
            this.handleSuccess(event);
          } else if (event.status >= 400 && event.status < 500) {
            this.handleError(event);
          }
        }
        return event;
      }),
    );
  }
  handleError(res: HttpResponse<any>) {}
  handleSuccess(res: HttpResponse<any>) {}
}
