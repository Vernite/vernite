import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/_main/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  public login({ email, password }: { email: string; password: string }) {
    return this.apiService.post(`/auth/login`, { body: { email, password } });
  }
}
