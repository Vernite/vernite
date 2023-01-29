import { isClass } from '@main/util/is-class/is-class.util';
import { vernite } from '@vernite/protobuf';
import { Message } from 'google-protobuf';
import { MessageMetadata } from './message-metadata.class';

/**
 * Class to store protobuf message metadata
 */
export class MessageMetadataRegistry {
  /** messages metadata registry by message class name */
  private _registryByClassName = new Map<string, MessageMetadata<any>>();

  /** messages metadata registry by message package name */
  private _registryByPackageName = new Map<string, MessageMetadata<any>>();

  constructor() {
    this.register(new MessageMetadata('Any', 'google.protobuf.Any', Message));

    for (const metadata of this.getMetadataForClass('vernite', vernite)) {
      this.register(metadata);
    }
  }

  /** Get message metadata by class name */
  public getByClassName(className: string) {
    return this._registryByClassName.get(className);
  }

  /** Get message metadata by package name */
  public getByPackageName(packageName: string) {
    return this._registryByPackageName.get(packageName);
  }

  /** Get message metadata by class instance */
  public getByClassInstance<T extends Message>(instance: T) {
    return this.getByClassName(Reflect.get(instance.constructor, 'className'));
  }

  /**
   * Register message metadata
   * @param metadata message metadata to register
   */
  public register(metadata: MessageMetadata<any>) {
    this._registryByClassName.set(metadata.className, metadata);
    this._registryByPackageName.set(metadata.packageName, metadata);

    Reflect.defineProperty(metadata.classConstructor, 'className', { value: metadata.className });
  }

  /**
   * Get metadata for class
   * @param prefix package prefix
   * @param source source class
   * @returns metadata array
   */
  private getMetadataForClass<T extends object>(prefix: string, source: T) {
    let results: MessageMetadata<any>[] = [];

    for (const [key, cls] of Object.entries(source)) {
      if (isClass<typeof Message>(cls)) {
        results = [
          ...results,
          ...[new MessageMetadata(key, prefix + '.' + key, cls)],
          ...this.getMetadataForClass(prefix + '.' + key, cls),
        ];
      }
    }

    return results;
  }
}
