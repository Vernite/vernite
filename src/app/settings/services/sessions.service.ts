import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSession } from 'src/app/settings/interfaces/session.interface';
import { ApiService } from '@main/services/api/api.service';
import { BaseService } from '@main/services/base/base.service';
import { Errors } from '@main/interfaces/http-error.interface';

@Injectable({
  providedIn: 'root',
})
export class SessionsService extends BaseService<Errors<'CANNOT_REVOKE_SESSION'>> {
  protected override errorCodes = {
    CANNOT_REVOKE_SESSION: {
      message: $localize`Cannot revoke session`,
    },
  };

  constructor(private injector: Injector, private apiService: ApiService) {
    super(injector);
  }

  public list(): Observable<UserSession[]> {
    return this.apiService.get(`/session`);
  }

  public delete(id: number) {
    return this.apiService.delete(`/session/${id}`).pipe(
      this.validate({
        403: 'CANNOT_REVOKE_SESSION',
      }),
    );
  }
}
