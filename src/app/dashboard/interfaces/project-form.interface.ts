import { Observable } from 'rxjs';
import { Project } from './project.interface';

export interface ProjectForm {
  project?: Project;
  save(): Observable<Project>;
}
