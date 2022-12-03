import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import {
  filter,
  from,
  map,
  of,
  switchMap,
  Observable,
  OperatorFunction,
  share,
  finalize,
} from 'rxjs';
import { Message } from 'google-protobuf';
import { Any } from 'google-protobuf/google/protobuf/any_pb.js';
import { Service } from '../../decorators/service/service.decorator';
import { vernite } from '@vernite/protobuf';
import { environment } from '../../../../environments/environment';
import { MessageMetadataRegistry } from '@main/libs/proto/message-metadata-registry.class';

@Service()
@Injectable({
  providedIn: 'root',
})
export class ProtoService {
  protected _websocket$ = webSocket({
    url: environment.websocketUrl,
    deserializer: (e: MessageEvent) => e,
    serializer: (value: any) => value,
  });

  private messageMetadataRegistry = new MessageMetadataRegistry();

  constructor() {
    this.get<vernite.KeepAlive>(vernite.KeepAlive).subscribe((message) => {
      this.next(message);
    });

    this.get().subscribe((message) => {
      this.logMessage(message);
    });
  }

  protected isType<T extends Message, K extends typeof Message>(
    cls?: K,
  ): OperatorFunction<Message, T> {
    return filter((message: T) => {
      if (!cls) return true;
      return message instanceof cls;
    }) as OperatorFunction<Message, T>;
  }

  private serialize(value: Message) {
    const any = new Any();
    any.pack(
      value.serializeBinary(),
      this.messageMetadataRegistry.getByClassInstance(value)!.packageName,
    );
    return of(any.serializeBinary());
  }

  private deserialize(e: MessageEvent) {
    return from(e.data.arrayBuffer() as Promise<Uint8Array>).pipe(
      map((buffer: Uint8Array) => {
        const any = Any.deserializeBinary(buffer);
        const type = any.getTypeName();

        const messageClass = this.messageMetadataRegistry.getByPackageName(type)!.classConstructor;
        const message = any.unpack((bytes: Uint8Array) => {
          return messageClass.deserializeBinary(bytes);
        }, type);

        return message;
      }),
    );
  }

  public next(value: Message) {
    this.serialize(value).subscribe((data) => {
      this._websocket$.next(data as any);
    });
  }

  protected socket() {
    return this._websocket$.pipe(switchMap(this.deserialize.bind(this)));
  }

  public get<T extends Message & { action?: vernite.BasicAction }, K extends typeof Message = any>(
    cls?: K,
    action?: vernite.BasicAction,
  ): Observable<T> {
    return this.socket().pipe(
      this.isType<T, K>(cls),
      filter((message: T) => {
        if (!action) return true;
        return message.action === action;
      }),
      finalize(() => {
        this.unsubscribe();
      }),
      share(),
    );
  }

  protected unsubscribe() {
    if (environment.logSocketMessages) {
      console.groupCollapsed('[SOCKET] UNSUBSCRIBE');
      console.log('Closing socket');
      console.groupEnd();
    }
  }

  protected logMessage<T extends Message>(message: T) {
    if (environment.logSocketMessages) {
      console.groupCollapsed('[SOCKET] MESSAGE');
      console.log(message);
      console.groupEnd();
    }
  }
}
