import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '@main/decorators/service/service.decorator';
import { environment } from 'src/environments/environment';
import { RequestOptions } from '../../interfaces/request-options.interface';
import { DataFilter, DataFilterType } from '@main/interfaces/filters.interface';
import { ProtoService } from '../proto/proto.service';

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

  /**
   * Default service constructor with `HttpClient` dependency
   */
  constructor(private httpClient: HttpClient, private protoService: ProtoService) {}

  /**
   * Sends request to the API.
   * @param method HTTP method to use
   * @param url URL where to send request
   * @param options advanced options to configure request
   * @returns Request observable, which completes when request is finished
   */
  public request<T = any>(method: string, url: string, options?: RequestOptions) {
    const params = this.getParamsFromFilters(options?.filters);

    return this.httpClient.request<T>(method, this.apiURL + url, {
      responseType: 'json' as any,
      withCredentials: true,
      ...options,
      params: {
        ...(options?.params || {}),
        ...(params || {}),
      },
    });
  }

  /**
   * Sends GET request to the API.
   * @param url URL where to send request
   * @param options advanced options to configure request
   * @returns Request observable, which completes when request is finished
   */
  public get<T = any>(url: string, options?: RequestOptions) {
    return this.request<T>('GET', url, options);
  }

  /**
   * Sends POST request to the API.
   * @param url URL where to send request
   * @param options advanced options to configure request
   * @returns Request observable, which completes when request is finished
   */
  public post<T = any>(url: string, options?: RequestOptions) {
    return this.request<T>('POST', url, options);
  }

  /**
   * Sends DELETE request to the API.
   * @param url URL where to send request
   * @param options advanced options to configure request
   * @returns Request observable, which completes when request is finished
   */
  public delete<T = any>(url: string, options?: RequestOptions) {
    return this.request<T>('DELETE', url, options);
  }

  /**
   * Sends PUT request to the API.
   * @param url URL where to send request
   * @param options advanced options to configure request
   * @returns Request observable, which completes when request is finished
   */
  public put<T = any>(url: string, options?: RequestOptions) {
    return this.request<T>('PUT', url, options);
  }

  /**
   * Sends PATCH request to the API.
   * @param url URL where to send request
   * @param options advanced options to configure request
   * @returns Request observable, which completes when request is finished
   */
  public patch<T = any>(url: string, options?: RequestOptions) {
    return this.request<T>('PATCH', url, options);
  }

  private getParamsFromFilters<T, V extends string | boolean | number>(
    filters?: DataFilter<T, V>[] | DataFilter<T, V>,
  ) {
    if (!filters) {
      return;
    }

    const params: RequestOptions['params'] = {};

    if (!Array.isArray(filters)) {
      filters = [filters];
    }
    for (const filter of filters) {
      if (filter.type == DataFilterType.BACKEND) {
        params[filter.field] = filter.value;
      }
    }

    return params;
  }
}
