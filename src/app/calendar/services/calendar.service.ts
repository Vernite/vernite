import { Errors } from '@main/interfaces/http-error.interface';
import { BaseService } from '@main/services/base/base.service';
import { Injector, Injectable } from '@angular/core';
import { Service } from '@main/decorators/service/service.decorator';
import { Observable } from 'rxjs';
import { ApiService } from '@main/services/api/api.service';
import { DialogService } from '@main/services/dialog/dialog.service';
import { CalendarExportDialog } from '@calendar/dialogs/calendar-export/calendar-export.dialog';

/**
 * Calendar service
 */
@Service()
@Injectable({
  providedIn: 'root',
})
export class CalendarService extends BaseService<Errors<any>> {
  protected errorCodes = {};

  constructor(
    private injector: Injector,
    private apiService: ApiService,
    private dialogService: DialogService,
  ) {
    super(injector);
  }

  /**
   * Get calendar sync url
   * @param projectId project id
   * @returns sync url
   */
  public getSyncUrl(projectId?: number): Observable<string> {
    return (() => {
      if (projectId) {
        return this.apiService.post(`/project/${projectId}/events/sync`, { responseType: 'text' });
      } else {
        return this.apiService.post(`/auth/me/events/sync`, { responseType: 'text' });
      }
    })().pipe(this.validate());
  }

  /**
   * Open sync url dialog
   * @param projectId project id
   * @returns sync url
   */
  public openSyncUrlDialog(projectId?: number) {
    return this.dialogService
      .open(
        CalendarExportDialog,
        {
          projectId,
        },
        {
          width: '600px',
        },
      )
      .afterClosed();
  }
}
