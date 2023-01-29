/**
 * Persistent map options object
 */
export interface PersistentMapOptions {
  /** Persistent key (to use as a key in storage) */
  persistentKey: string;
}

/**
 * Persistent map class
 */
export class PersistentMap<K, V> extends Map<K, V> {
  /**
   * Clear map and remove it from storage
   */
  override clear(): void {
    localStorage.removeItem(this._persistentKey);
    super.clear();
  }

  /**
   * Delete item from map and save it to storage
   * @param key Key to delete
   * @returns true if an element in the Map existed and has been removed, or false if the element does not exist.
   */
  override delete(key: K): boolean {
    const temp = super.delete(key);
    this.saveState();
    return temp;
  }

  /**
   * Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.
   * @param key element identifier in map
   * @param value element value
   * @returns the Map object.
   */
  override set(key: K, value: V): this {
    const temp = super.set(key, value);
    this.saveState();
    return temp;
  }

  /**
   * Save map to storage
   */
  private saveState() {
    localStorage.setItem(this._persistentKey, JSON.stringify([...this.entries()]));
  }

  /**
   * Persistent key
   */
  private _persistentKey = '';

  constructor(
    { persistentKey }: PersistentMapOptions,
    entries?: readonly (readonly [K, V])[] | null,
  ) {
    super(
      persistentKey && localStorage.getItem(persistentKey)
        ? JSON.parse(localStorage.getItem(persistentKey)!)
        : entries,
    );

    if (!persistentKey) {
      console.error('PersistentMap need persistentKey option');
      return;
    }

    this._persistentKey = persistentKey;
  }
}
