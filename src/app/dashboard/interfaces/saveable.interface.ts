import { Observable } from 'rxjs';

// TODO: Integrate this interface with the rest of the project or remove it
export interface Saveable {
  save(): Observable<boolean>;
}
