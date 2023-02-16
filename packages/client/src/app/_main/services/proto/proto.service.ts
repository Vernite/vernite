import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import {
  filter,
  from,
  of,
  map,
  switchMap,
  Observable,
  share,
  finalize,
  OperatorFunction,
} from 'rxjs';
import { Service } from '../../decorators/service/service.decorator';
import { environment } from '../../../../environments/environment';
import { Subject } from 'rxjs';
import { BasicAction, KeepAlive } from '@proto/vernite';
import { MessageType, messageTypeRegistry, UnknownMessage } from '@proto/typeRegistry';
import { Any } from '@proto/google/protobuf/any';

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
    this.get(KeepAlive).subscribe((message) => {
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
  protected isType<T extends UnknownMessage>(obj?: T) {
    return filter((message: T) => {
      if (!obj) return true;
      return message.$type === obj.$type;
    }) as OperatorFunction<UnknownMessage, T>;
  }

  /** Serialize message to send over websocket */
  private serialize(value: UnknownMessage) {
    return of(
      Any.create({
        typeUrl: value.$type,
        value: messageTypeRegistry.get(value.$type)!.encode(value).finish(),
      }),
    );
  }

  /** Deserialize message from websocket */
  private deserialize(e: MessageEvent) {
    return from(e.data.arrayBuffer() as Promise<Uint8Array>).pipe(
      map((buffer: Uint8Array) => {
        const any = Any.decode(buffer);
        const type = any.typeUrl;

        const messageType = messageTypeRegistry.get(type)!;
        return messageType.decode(any.value) as MessageType;
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
  public next(value: UnknownMessage) {
    if (this.isConnectionClosed()) return;

    this.serialize(value).subscribe((data) => {
      this._websocket$!.next(data as any);
    });
  }

  /** Websocket observable */
  protected socket(): Observable<UnknownMessage> {
    return this._internalSocket$.pipe(switchMap(this.deserialize.bind(this)));
  }

  /**
   * Get observable for specific message type
   * @param cls message class
   * @param action basic action of message
   * @returns observable for specific message type
   */
  public get<T extends UnknownMessage & { action?: BasicAction }>(
    obj?: T,
    action?: BasicAction,
  ): Observable<T> {
    return this.socket().pipe(
      this.isType<T>(obj),
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
  protected logMessage<T extends UnknownMessage>(message: T) {
    if (environment.logSocketMessages) {
      console.groupCollapsed('[SOCKET] MESSAGE');
      console.log(message);
      console.groupEnd();
    }
  }
}
