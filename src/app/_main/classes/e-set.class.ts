export class ESet<T = any> extends Set<T> {
  toggle(key: any) {
    if (this.has(key)) {
      this.delete(key);
    } else {
      this.add(key);
    }
  }
}
