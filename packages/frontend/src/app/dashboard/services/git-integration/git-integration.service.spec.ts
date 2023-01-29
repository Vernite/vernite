/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { GitIntegrationService } from './git-integration.service';

describe('Service: GitIntegration', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [GitIntegrationService],
    });
  });

  it('should ...', inject([GitIntegrationService], (service: GitIntegrationService) => {
    expect(service).toBeTruthy();
  }));
});
