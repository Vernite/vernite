import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequestOptions } from '../interfaces/request-options.interface';
import { Service } from '../decorators/service.decorator';

@Service()
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiURL: string = environment.apiURL;

  constructor(private httpClient: HttpClient) {}

  public request(method: string, url: string, options?: RequestOptions) {
    return this.httpClient.request(method, this.apiURL + url, {
      responseType: 'json',
      ...options,
    });
  }

  public get(url: string, options?: RequestOptions) {
    return this.request('GET', url, options);
  }

  public post(url: string, options?: RequestOptions) {
    return this.request('POST', url, options);
  }

  public delete(url: string, options?: RequestOptions) {
    return this.request('DELETE', url, options);
  }

  public put(url: string, options?: RequestOptions) {
    return this.request('PUT', url, options);
  }

  public patch(url: string, options?: RequestOptions) {
    return this.request('PATCH', url, options);
  }
}
