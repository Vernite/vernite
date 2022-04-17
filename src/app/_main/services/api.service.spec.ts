/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { Utils } from '../classes/utils.class';
import { ApiService } from './api.service';

describe('Service: Api', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService],
    });
  });

  it('should create', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  // it('should can perform POST > PATCH > DELETE chain', inject(
  //   [ApiService],
  //   (service: ApiService) => {
  //     (async () => {
  //       const testObject = {
  //         name: 'Test Workspace',
  //         role: 'Test description',
  //       };
  //       const newlyCreatedTest = await firstValueFrom(
  //         service.post('/tests/', { body: testObject }),
  //       );

  //       newlyCreatedTest.role = 'Test description 2';

  //       await firstValueFrom(
  //         service.patch(`/tests/${newlyCreatedTest.id}`, { body: newlyCreatedTest }),
  //       );
  //       await firstValueFrom(service.delete(`/tests/${newlyCreatedTest.id}`));

  //       expect(service.get(`/test/${newlyCreatedTest.id}`)).toThrowError();
  //     })();
  //   },
  // ));

  // it('Should send GET request to tests endpoint', inject([ApiService], (service: ApiService) => {
  //   service.get('/tests/').subscribe((data) => {
  //     expect(data.length).toBeGreaterThan(0);
  //   });
  // }));
});
