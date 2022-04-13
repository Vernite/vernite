import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/_main/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  constructor(private apiService: ApiService) {}

  public create(name: string) {
    this.apiService.post('/workspaces', { body: { name } }).subscribe((response) => {
      console.log(response);
    });
  }
}
