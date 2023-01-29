/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogTestingProvider } from '@tests/helpers/mat-dialog-testing-provider.helper';
import { StatusService } from './status.service';

describe('Service: Status', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule],
      providers: [StatusService, MatDialogTestingProvider],
    });
  });

  it('should ...', inject([StatusService], (service: StatusService) => {
    expect(service).toBeTruthy();
  }));
});
