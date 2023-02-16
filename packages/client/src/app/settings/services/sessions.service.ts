import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@main/services/api/api.service';
import { BaseService } from '@main/services/base/base.service';
import { Errors } from '@main/interfaces/http-error.interface';
import { UserSession } from '../interfaces/session.interface';

/**
 * Sessions service
 */
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

  /**
   * List all sessions
   * @returns sessions list
   */
  public list(): Observable<UserSession[]> {
    return this.apiService.get(`/session`);
  }

  /**
   * Delete session
   * @param id session id
   * @returns delete response observable
   */
  public delete(id: number): Observable<void> {
    return this.apiService.delete(`/session/${id}`).pipe(
      this.validate({
        403: 'CANNOT_REVOKE_SESSION',
      }),
    );
  }
}
