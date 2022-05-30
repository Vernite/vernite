/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from '@main/services/dialog.service';
import { TaskService } from './task.service';

describe('Service: Task', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule],
      providers: [
        TaskService,
        DialogService,
        MatDialogModule,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    });
  });

  it('should ...', inject([TaskService], (service: TaskService) => {
    expect(service).toBeTruthy();
  }));
});
