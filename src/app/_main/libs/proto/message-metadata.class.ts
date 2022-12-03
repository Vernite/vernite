import { Message } from 'google-protobuf';

export class MessageMetadata<T extends typeof Message> {
  public className: string;
  public packageName: string;
  public classConstructor: T;

  constructor(className: string, packageName: string, classConstructor: T) {
    this.className = className;
    this.packageName = packageName;
    this.classConstructor = classConstructor;
  }
}
