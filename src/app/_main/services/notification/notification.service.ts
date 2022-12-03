import { Injectable } from '@angular/core';
import { Service } from '../../decorators/service/service.decorator';
import { ApiService } from '@main/services/api/api.service';
import { ProtoService } from '../proto/proto.service';
import { vernite } from '@vernite/protobuf';
import { SnackbarService } from '../snackbar/snackbar.service';

@Service()
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private apiService: ApiService,
    private protoService: ProtoService,
    private snackbarService: SnackbarService,
  ) {}

  public init() {
    this.protoService
      .get<vernite.CommunicatorModel.Message>(vernite.CommunicatorModel.Message)
      .subscribe((message) => {
        this.snackbarService.show(message.channel + ':' + message.content);
      });
  }
}
