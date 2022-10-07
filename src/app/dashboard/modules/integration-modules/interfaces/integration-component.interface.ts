import { Project } from '@dashboard/interfaces/project.interface';
import { Observable } from 'rxjs';

export interface IntegrationComponent {
  project?: Project;
  save(): Observable<any>;
}
