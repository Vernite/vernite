/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from '@main/services/dialog/dialog.service';
import { DumpProtoService } from '@main/services/proto/dump.proto.service';
import { ProtoService } from '@main/services/proto/proto.service';
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
        {
          provide: ProtoService,
          useClass: DumpProtoService,
        },
      ],
    });
  });

  it('should ...', inject([TaskService], (service: TaskService) => {
    expect(service).toBeTruthy();
  }));
});
