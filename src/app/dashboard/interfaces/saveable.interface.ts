import { Observable } from 'rxjs';

export interface Saveable {
  save(): Observable<boolean>;
}
