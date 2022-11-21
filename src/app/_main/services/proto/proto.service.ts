import { Injectable } from '@angular/core';
import { Service } from '@main/decorators/service/service.decorator';
import { NewTaskNotification } from '@vernite/protobuf/notifications/task.notification_pb';

@Service()
@Injectable({
  providedIn: 'root',
})
export class ProtoService {
  constructor() {
    const webSocket = new WebSocket('wss://vernite.dev/api/ws');

    const message = this.next();
    console.log(message);
  }

  public next() {
    const notification = new NewTaskNotification();
    notification.setName('test');
    notification.setCreatedat('test');
    return notification;
  }
}
