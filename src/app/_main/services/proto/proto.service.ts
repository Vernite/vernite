import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
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
import { Subject } from 'rxjs';

/**
 * Proto service (for real time communication using websocket)
 */
@Service()
@Injectable({
  providedIn: 'root',
})
export class ProtoService {
  /** Websocket observable */
  protected _websocket$?: WebSocketSubject<MessageEvent<any>>;

  /** Internal socket as middleware between websocket and subscribing subjects */
  protected _internalSocket$ = new Subject<MessageEvent<any>>();

  /** Message metadata registry (used for storing meta for message types/classes) */
  private messageMetadataRegistry = new MessageMetadataRegistry();

  constructor() {
    this.startSendingKeepAliveMessage();
    this.startLoggingMessages();
  }

  /** Connect to websocket and pipe output from websocket to internal socket */
  public connect() {
    if (this.isConnectionOpen()) return;

    this._websocket$ = this.constructWebsocket();

    this._websocket$.subscribe((message) => {
      this._internalSocket$.next(message);
    });
  }

  /** disconnect from websocket */
  public disconnect() {
    this._websocket$?.complete();
    this._websocket$ = undefined;
  }

  /**
   * Create websocket connection
   * @returns websocket observable
   */
  protected constructWebsocket() {
    return webSocket({
      url: environment.websocketUrl,
      deserializer: (e: MessageEvent) => e,
      serializer: (value: any) => value,
    });
  }

  /**
   * Start sending KeepAlive messages to websocket
   */
  protected startSendingKeepAliveMessage() {
    this.get<vernite.KeepAlive>(vernite.KeepAlive).subscribe((message) => {
      this.next(message);
    });
  }

  /**
   * Start logging websocket messages to console
   */
  protected startLoggingMessages() {
    this.get().subscribe((message) => {
      this.logMessage(message);
    });
  }

  /** IsType operator function - filters all different type messages */
  protected isType<T extends Message, K extends typeof Message>(
    cls?: K,
  ): OperatorFunction<Message, T> {
    return filter((message: T) => {
      if (!cls) return true;
      return message instanceof cls;
    }) as OperatorFunction<Message, T>;
  }

  /** Serialize message to send over websocket */
  private serialize(value: Message) {
    const any = new Any();
    any.pack(
      value.serializeBinary(),
      this.messageMetadataRegistry.getByClassInstance(value)!.packageName,
    );
    return of(any.serializeBinary());
  }

  /** Deserialize message from websocket */
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

  /**
   * Check if connection is closed
   * @returns true if connection does not exist or is closed, false otherwise
   */
  public isConnectionClosed(): boolean {
    return Boolean(!this._websocket$ || this._websocket$?.closed);
  }

  /**
   * Check if connection is open
   * @returns true if connection exists and is open, false otherwise
   */
  public isConnectionOpen(): boolean {
    return Boolean(this._websocket$ && !this._websocket$.closed);
  }

  /**
   * Send message over websocket
   * @param value value to send over websocket
   */
  public next(value: Message) {
    if (this.isConnectionClosed()) return;

    this.serialize(value).subscribe((data) => {
      this._websocket$!.next(data as any);
    });
  }

  /** Websocket observable */
  protected socket() {
    return this._internalSocket$.pipe(switchMap(this.deserialize.bind(this)));
  }

  /**
   * Get observable for specific message type
   * @param cls message class
   * @param action basic action of message
   * @returns observable for specific message type
   */
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

  /**
   * Unsubscribe specific message type
   */
  protected unsubscribe() {
    if (environment.logSocketMessages) {
      console.groupCollapsed('[SOCKET] UNSUBSCRIBE');
      console.log('Closing socket');
      console.groupEnd();
    }
  }

  /**
   * Log message to console
   * @param message message to log
   */
  protected logMessage<T extends Message>(message: T) {
    if (environment.logSocketMessages) {
      console.groupCollapsed('[SOCKET] MESSAGE');
      console.log(message);
      console.groupEnd();
    }
  }
}
