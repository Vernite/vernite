import { Injectable, Injector } from '@angular/core';
import { BaseService } from '@main/services/base/base.service';
import { Errors } from '../../../_main/interfaces/http-error.interface';
import { ProtoService } from '../../../_main/services/proto/proto.service';
import { vernite } from '@vernite/protobuf';
import { ApiService } from '@main/services/api/api.service';
import { filter, interval, map, take, Observable } from 'rxjs';
import { SlackIntegration } from '@messages/interfaces/slack-integration.interface';

@Injectable({
  providedIn: 'root',
})
export class SlackService extends BaseService<Errors<any>> {
  protected errorCodes = {};
  constructor(
    private injector: Injector,
    private apiService: ApiService,
    private protoService: ProtoService,
  ) {
    super(injector);
  }

  sendMessage(content: string, channel: string) {
    const messageObject = new vernite.CommunicatorModel.Message({
      content,
      channel,
    });

    this.protoService.next(messageObject);
  }

  openIntegrationPage() {
    const win = window.open('/api/integration/slack/install', '_blank');

    if (!win) throw new Error('This browser does not support window.open');

    return interval(100).pipe(
      map(() => win.closed),
      filter((closed) => closed),
      take(1),
    );
  }

  getSlackIntegrations(): Observable<SlackIntegration[]> {
    return this.apiService.get('/user/integration/slack').pipe(this.validate());
  }

  deleteIntegration(integrationId: number): Observable<void> {
    return this.apiService.delete(`/user/integration/slack/${integrationId}`).pipe(this.validate());
  }
}
