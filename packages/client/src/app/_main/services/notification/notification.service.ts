import { Injectable } from '@angular/core';
import { Service } from '../../decorators/service/service.decorator';
import { ApiService } from '@main/services/api/api.service';
import { ProtoService } from '../proto/proto.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { CommunicatorModel_Message } from '@proto/vernite';

/**
 * Notification service
 */
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

  /**
   * Init notification service
   */
  public init() {
    this.protoService.get(CommunicatorModel_Message).subscribe((message) => {
      this.snackbarService.show(message.channel + ':' + message.content);
    });
  }
}
