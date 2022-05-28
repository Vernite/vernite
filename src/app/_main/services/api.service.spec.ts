/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('Service: Api', () => {
  let httpTestingController: HttpTestingController;
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  it('should create', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  it('post() - should send post request', (done) => {
    service.post('/test', { body: 'test' }).subscribe((response) => {
      expect(response).toEqual({ test: 'test' });
      done();
    });

    const testRequest = httpTestingController.expectOne('/api/test');
    testRequest.flush({ test: 'test' });
  });

  it('get() - should send get request', (done) => {
    service.get('/test').subscribe((response) => {
      expect(response).toEqual({ test: 'test' });
      done();
    });

    const testRequest = httpTestingController.expectOne('/api/test');
    testRequest.flush({ test: 'test' });
  });

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
