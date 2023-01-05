import { JSONParsable } from '@main/interfaces/json-parsable.interface';
import { get, set, unset, has } from 'lodash-es';

/**
 * Store class
 */
export class Store {
  /**
   * The current state of the store
   */
  private state: { [key: string]: JSONParsable } = {};

  /**
   * Set value in store
   * @param path path to value
   * @param value value to set
   */
  public set(path: (string | number)[], value: JSONParsable) {
    set(this.state, path, value);
    this.print();
  }

  /**
   * Get value from store
   * @param path path to value
   * @returns value at path
   */
  public get(path: (string | number)[]): JSONParsable | undefined {
    return get(this.state, path);
  }

  /**
   * Check if store has value at path
   * @param path path to value
   * @returns true if value exists
   */
  public has(path: (string | number)[]): boolean {
    return has(this.state, path);
  }

  /**
   * Remove value from store
   * @param path path to value
   */
  public remove(path: (string | number)[]) {
    unset(this.state, path);
  }

  /**
   * Clear store
   */
  public clear() {
    this.state = {};
  }

  /**
   * Print store to console
   */
  public print() {
    console.group('Store');
    for (const key in this.state) {
      console.log(key, this.state[key]);
    }
    console.groupEnd();
  }
}
