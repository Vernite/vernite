import { Errors } from '@main/interfaces/http-error.interface';
import { BaseService } from '@main/services/base/base.service';
import { Injector, Injectable } from '@angular/core';
import { ApiService } from '@main/services/api/api.service';
import { Observable, switchMap, EMPTY } from 'rxjs';
import { DialogService } from '@main/services/dialog/dialog.service';
import { Service } from '@main/decorators/service/service.decorator';
import { ReportBugDialog } from '@main/dialogs/report-bug/report-bug.dialog';
import { ReportBug } from '@main/interfaces/report.interface';

/**
 * Report service
 */
@Service()
@Injectable({
  providedIn: 'root',
})
export class ReportService extends BaseService<Errors<'FORM_VALIDATION_ERROR'>> {
  protected errorCodes = {
    FORM_VALIDATION_ERROR: {
      message: $localize`Form validation error`,
    },
  };

  constructor(
    private injector: Injector,
    private apiService: ApiService,
    private dialogService: DialogService,
  ) {
    super(injector);
  }

  /**
   * Create bug report
   * @param projectId project id
   * @returns bug report
   */
  public create(reportBug: ReportBug): Observable<ReportBug> {
    return this.apiService.post(`/ticket`, { body: reportBug }).pipe(
      this.validate({
        400: 'FORM_VALIDATION_ERROR',
      }),
    );
  }

  /**
   * Open bug report dialog
   * @param projectId project id
   * @returns bug report
   */
  public openBugReportDialog(): Observable<ReportBug> {
    return this.dialogService
      .open(ReportBugDialog, {})
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (!result) return EMPTY;

          return this.create(result);
        }),
      );
  }
}
