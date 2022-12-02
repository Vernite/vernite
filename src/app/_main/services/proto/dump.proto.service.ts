import { Injectable } from '@angular/core';
import { ProtoService } from '@main/services/proto/proto.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DumpProtoService extends ProtoService {
  protected override _websocket$ = new BehaviorSubject<void>(undefined) as any;
}
