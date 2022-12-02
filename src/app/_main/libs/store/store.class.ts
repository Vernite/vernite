import { JSONParsable } from '@main/interfaces/json-parsable.interface';
import { get, set, unset, has } from 'lodash-es';

export class Store {
  /**
   * The current state of the store
   */
  private state: { [key: string]: JSONParsable } = {};

  public set(path: (string | number)[], value: JSONParsable) {
    set(this.state, path, value);
    this.print();
  }

  public get(path: (string | number)[]): JSONParsable | undefined {
    return get(this.state, path);
  }

  public has(path: (string | number)[]): boolean {
    return has(this.state, path);
  }

  public remove(path: (string | number)[]) {
    unset(this.state, path);
  }

  public clear() {
    this.state = {};
  }

  public print() {
    console.group('Store');
    for (const key in this.state) {
      console.log(key, this.state[key]);
    }
    console.groupEnd();
  }
}
