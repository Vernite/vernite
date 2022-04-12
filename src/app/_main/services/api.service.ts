import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequestOptions } from '../interfaces/request-options.interface';

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

  public get(url: string, params?: RequestOptions['params']) {
    return this.request('GET', url, { params });
  }

  public post(url: string, params?: RequestOptions['params'], body?: any) {
    return this.request('POST', url, { params, body });
  }

  public delete(url: string, params?: RequestOptions['params']) {
    return this.request('DELETE', url, { params });
  }

  public put(url: string, params?: RequestOptions['params'], body?: any) {
    return this.request('PUT', url, { params, body });
  }

  public patch(url: string, params?: RequestOptions['params'], body?: any) {
    return this.request('PATCH', url, { params, body });
  }

  public getHelloWorld(name: string) {
    this.get('/hello', { name }).subscribe((response) => {
      console.log(response);
    });
  }
}
