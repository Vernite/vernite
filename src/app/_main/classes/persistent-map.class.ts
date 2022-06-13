export interface PersistentMapOptions {
  persistentKey: string;
}

export class PersistentMap<K, V> extends Map<K, V> {
  override clear(): void {
    localStorage.removeItem(this._persistentKey);
    super.clear();
  }

  override delete(key: K): boolean {
    const temp = super.delete(key);
    this.saveState();
    return temp;
  }

  override set(key: K, value: V): this {
    const temp = super.set(key, value);
    this.saveState();
    return temp;
  }

  private saveState() {
    localStorage.setItem(this._persistentKey, JSON.stringify([...this.entries()]));
  }

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
