import { Injectable } from '@angular/core';
import { ProtoService } from '@main/services/proto/proto.service';
import { BehaviorSubject } from 'rxjs';

/**
 * Dump proto service (to use in tests providers due to websocket errors in tests)
 */
@Injectable({
  providedIn: 'root',
})
export class DumpProtoService extends ProtoService {
  /** Empty Websocket observable (to disable real websocket) */
  protected override _websocket$ = new BehaviorSubject<void>(undefined) as any;
}
