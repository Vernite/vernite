/** Extended set class to add some useful methods. */
export class ESet<T = any> extends Set<T> {
  /** Toggles specific value in set (if value already exists remove it from set, add this value otherwise) */
  toggle(key: any) {
    if (this.has(key)) {
      this.delete(key);
    } else {
      this.add(key);
    }
  }
}
