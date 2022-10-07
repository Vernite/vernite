/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterExtensionsService } from './router-extensions.service';

describe('Service: RouterExtensions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [RouterExtensionsService],
    });
  });

  it('should ...', inject([RouterExtensionsService], (service: RouterExtensionsService) => {
    expect(service).toBeTruthy();
  }));
});
