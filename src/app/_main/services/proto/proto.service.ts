import { Injectable } from '@angular/core';
import { tutorial } from '@vernite/protobuf';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {
  filter,
  from,
  map,
  of,
  switchMap,
  Observable,
  MonoTypeOperatorFunction,
  OperatorFunction,
  Subject,
  share,
  finalize,
} from 'rxjs';
import { Message } from 'google-protobuf';
import { Any } from 'google-protobuf/google/protobuf/any_pb.js';

@Injectable({
  providedIn: 'root',
})
export class ProtoService {
  private _websocket$ = webSocket({
    url: 'wss://vernite.dev/api/ws',
    deserializer: (e: MessageEvent) => e,
    serializer: (value: any) => value,
  });

  protected isType<T extends Message, K extends typeof Message>(
    cls: K,
  ): OperatorFunction<Message, T> {
    return filter((message: T) => {
      return message instanceof cls;
    }) as OperatorFunction<Message, T>;
  }

  private serialize(value: Message) {
    const any = new Any();
    any.pack(value.serializeBinary(), value.constructor.name);
    return of(any.serializeBinary());
  }

  private deserialize(e: MessageEvent) {
    return from(e.data.arrayBuffer() as Promise<Uint8Array>).pipe(
      map((buffer: Uint8Array) => {
        const any = Any.deserializeBinary(buffer);
        const type = any.getTypeName();
        const message = any.unpack((bytes: Uint8Array) => {
          return (tutorial as any)[type].deserializeBinary(bytes) as Message;
        }, type);
        return message!;
      }),
    );
  }

  private next(value: Message) {
    this.serialize(value).subscribe((data) => {
      this._websocket$.next(data as any);
    });
  }

  protected socket() {
    return this._websocket$.pipe(switchMap(this.deserialize));
  }

  protected subscribe<T extends Message, K extends typeof Message>(cls: K): Observable<T> {
    return this.socket().pipe(
      this.isType<T, K>(cls),
      finalize(() => {
        this.unsubscribe();
      }),
      share(),
    );
  }

  protected unsubscribe() {}
}
