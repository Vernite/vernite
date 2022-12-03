import { isClass } from '@main/classes/util/is-class';
import { vernite } from '@vernite/protobuf';
import { Message } from 'google-protobuf';
import { MessageMetadata } from './message-metadata.class';

export class MessageMetadataRegistry {
  private _registryByClassName = new Map<string, MessageMetadata<any>>();
  private _registryByPackageName = new Map<string, MessageMetadata<any>>();

  constructor() {
    this.register(new MessageMetadata('Any', 'google.protobuf.Any', Message));

    for (const metadata of this.getMetadataForClass('vernite', vernite)) {
      this.register(metadata);
    }
  }

  public getByClassName(className: string) {
    return this._registryByClassName.get(className);
  }

  public getByPackageName(packageName: string) {
    return this._registryByPackageName.get(packageName);
  }

  public getByClassInstance<T extends Message>(instance: T) {
    return this.getByClassName(Reflect.get(instance.constructor, 'className'));
  }

  public register(metadata: MessageMetadata<any>) {
    this._registryByClassName.set(metadata.className, metadata);
    this._registryByPackageName.set(metadata.packageName, metadata);

    Reflect.defineProperty(metadata.classConstructor, 'className', { value: metadata.className });
  }

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
