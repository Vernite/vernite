import { Project } from '@dashboard/interfaces/project.interface';
import { Observable } from 'rxjs';

/**
 * Interface to represent integration component
 */
export interface IntegrationComponent {
  /** Project object */
  project?: Project;

  /** Save integration component */
  save(): Observable<any>;
}
