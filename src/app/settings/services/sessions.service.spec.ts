/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { SessionsService } from './sessions.service';

describe('Service: Project', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SessionsService],
    });
  });

  it('should ...', inject([SessionsService], (service: SessionsService) => {
    expect(service).toBeTruthy();
  }));
});
