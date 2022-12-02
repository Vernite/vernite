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

  // it('delete() - should send delete request', (done) => {
  //   service.delete('/test').subscribe((response) => {
  //     expect(response).toEqual({ test: 'test' });
  //     done();
  //   });

  //   const testRequest = httpTestingController.expectOne('/api/test');
  //   testRequest.flush({ test: 'test' });
  // });

  it('put() - should send put request', (done) => {
    service.put('/test', { body: 'test' }).subscribe((response) => {
      expect(response).toEqual({ test: 'test' });
      done();
    });

    const testRequest = httpTestingController.expectOne('/api/test');
    testRequest.flush({ test: 'test' });
  });

  it('patch() - should send patch request', (done) => {
    service.patch('/test', { body: 'test' }).subscribe((response) => {
      expect(response).toEqual({ test: 'test' });
      done();
    });

    const testRequest = httpTestingController.expectOne('/api/test');
    testRequest.flush({ test: 'test' });
  });
});
