/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { WorkspaceService } from './workspace.service';
import { ProtoService } from '../../../_main/services/proto/proto.service';
import { DumpProtoService } from '@main/services/proto/dump.proto.service';

describe('Service: Workspace', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        WorkspaceService,
        {
          provide: ProtoService,
          useClass: DumpProtoService,
        },
      ],
    });
  });

  it('should ...', inject([WorkspaceService], (service: WorkspaceService) => {
    expect(service).toBeTruthy();
  }));
});
