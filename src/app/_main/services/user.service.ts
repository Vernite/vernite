import { Injectable } from '@angular/core';
/**
 * User management service
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  /**
   * current logged user ID
   */
  public userId: number = 1;
  constructor() {}
}
