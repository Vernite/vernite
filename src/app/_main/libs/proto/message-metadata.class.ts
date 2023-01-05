import { Message } from 'google-protobuf';

/**
 * Class to store protobuf message metadata
 */
export class MessageMetadata<T extends typeof Message> {
  /** Message class name */
  public className: string;
  /** Message package name */
  public packageName: string;
  /** Message class constructor */
  public classConstructor: T;

  constructor(className: string, packageName: string, classConstructor: T) {
    this.className = className;
    this.packageName = packageName;
    this.classConstructor = classConstructor;
  }
}
