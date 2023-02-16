/**
 * Class to store protobuf message metadata
 */
export class MessageMetadata<T extends object> {
  /** Message class name */
  public className: string;
  /** Message class constructor */
  public classConstructor: T;

  constructor(className: string, classConstructor: T) {
    this.className = className;
    this.classConstructor = classConstructor;
  }
}
