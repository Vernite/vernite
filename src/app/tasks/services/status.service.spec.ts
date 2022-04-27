/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StatusService } from './status.service';

describe('Service: Status', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatusService]
    });
  });

  it('should ...', inject([StatusService], (service: StatusService) => {
    expect(service).toBeTruthy();
  }));
});
