import { Observable } from 'rxjs';
import { Project } from './project.interface';

/**
 * Interface to represent project form stage
 */
export interface ProjectForm {
  /** Project object */
  project?: Project;

  /** Save project form */
  save(): Observable<Project>;

  validate(): Observable<boolean>;
}
