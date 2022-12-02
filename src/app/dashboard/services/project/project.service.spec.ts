/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { ProjectService } from './project.service';
import { ProtoService } from '@main/services/proto/proto.service';
import { DumpProtoService } from '@main/services/proto/dump.proto.service';

describe('Service: Project', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ProjectService,
        {
          provide: ProtoService,
          useClass: DumpProtoService,
        },
      ],
    });
  });

  it('should ...', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();
  }));
});
