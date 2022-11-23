import { Injectable } from '@angular/core';
import { NewTaskNotification } from '@vernite/protobuf/notifications/task.notification.js';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { filter, from, map, of } from 'rxjs';
import { Message } from 'google-protobuf';
import { Any } from 'google-protobuf/google/protobuf/any_pb.js';

@Injectable({
  providedIn: 'root',
})
export class ProtoService {
  private _websocket$!: WebSocketSubject<any>;

  // public TASKS = this._websocket$.pipe(this.isType(NewTaskNotification));

  constructor() {
    this.connect();
  }

  connect() {
    this._websocket$ = webSocket({
      url: 'wss://vernite.dev/api/ws',
      deserializer: (e: MessageEvent) => e,
      serializer: (value: any) => value,
    });

    this._websocket$.subscribe((message: MessageEvent) => {
      this.deserialize(message).subscribe((message: Message) => {
        console.log(message);
      });
    });

    console.log(
      new NewTaskNotification({
        name: 'Test',
        createdAt: '2021-01-01',
        taskId: 1,
      }).serializeBinary(),
    );

    this.serialize(
      new NewTaskNotification({
        name: 'Test',
        createdAt: '2021-01-01',
        taskId: 1,
      }),
    ).subscribe((data) => {
      this._websocket$.next(data);
    });
  }

  isType(cls: typeof Message) {
    return filter((message: Message) => {
      return message.getJsPbMessageId() === cls.name;
    });
  }

  serialize(value: Message) {
    const any = new Any();
    any.pack(value.serializeBinary(), value.constructor.name);
    return of(any.serializeBinary());
  }

  deserialize(e: MessageEvent) {
    return from(e.data.arrayBuffer() as Promise<Uint8Array>).pipe(
      map((buffer: Uint8Array) => {
        const any = Any.deserializeBinary(buffer);
        const type = any.getTypeName();
        const message = any.unpack((bytes: Uint8Array) => {
          return any.getValue().deserializeBinary(bytes);
        }, type);
        return message!;
      }),
    );
  }
}
