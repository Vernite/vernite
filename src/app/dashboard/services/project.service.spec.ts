/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectService } from './project.service';

describe('Service: Project', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProjectService],
    });
  });

  it('should ...', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();
  }));
});
