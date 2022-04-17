import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequestOptions } from '../interfaces/request-options.interface';
import { Service } from '../decorators/service.decorator';

/**
 * Service to access the API
 */
@Service()
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /**
   * URL of the API. Provided in the environment configuration file.
   */
  private apiURL: string = environment.apiURL;

  /** Default service constructor with `HttpClient` dependency */
  constructor(
    /**
     * Client for managing HTTP requests.
     */
    private httpClient: HttpClient,
  ) {}

  /**
   * Sends request to the API.
   * @param method HTTP method to use
   * @param url URL where to send request
   * @param options advanced options to configure request
   * @returns Request observable, which completes when request is finished
   */
  public request(method: string, url: string, options?: RequestOptions) {
    return this.httpClient.request(method, this.apiURL + url, {
      responseType: 'json',
      ...options,
    });
  }

  /**
   * Sends GET request to the API.
   * @param url URL where to send request
   * @param options advanced options to configure request
   * @returns Request observable, which completes when request is finished
   */
  public get(url: string, options?: RequestOptions) {
    return this.request('GET', url, options);
  }

  /**
   * Sends POST request to the API.
   * @param url URL where to send request
   * @param options advanced options to configure request
   * @returns Request observable, which completes when request is finished
   */
  public post(url: string, options?: RequestOptions) {
    return this.request('POST', url, options);
  }

  /**
   * Sends DELETE request to the API.
   * @param url URL where to send request
   * @param options advanced options to configure request
   * @returns Request observable, which completes when request is finished
   */
  public delete(url: string, options?: RequestOptions) {
    return this.request('DELETE', url, options);
  }

  /**
   * Sends PUT request to the API.
   * @param url URL where to send request
   * @param options advanced options to configure request
   * @returns Request observable, which completes when request is finished
   */
  public put(url: string, options?: RequestOptions) {
    return this.request('PUT', url, options);
  }

  /**
   * Sends PATCH request to the API.
   * @param url URL where to send request
   * @param options advanced options to configure request
   * @returns Request observable, which completes when request is finished
   */
  public patch(url: string, options?: RequestOptions) {
    return this.request('PATCH', url, options);
  }
}
