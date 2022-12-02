import { Injectable } from '@angular/core';
import { vernite } from '@vernite/protobuf';
import { ProtoService } from '../../../_main/services/proto/proto.service';

@Injectable({
  providedIn: 'root',
})
export class SlackProtoService {
  public MESSAGES = this.protoService.subscribe<
    vernite.CommunicatorModel.Message,
    typeof vernite.CommunicatorModel.Message
  >(vernite.CommunicatorModel.Message);

  constructor(private protoService: ProtoService) {}

  sendMessage(content: string, channel: string) {
    const messageObject = new vernite.CommunicatorModel.Message({
      content,
      channel,
    });

    this.protoService.next(messageObject);
  }
}
