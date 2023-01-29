import { ProtoService } from '@main/services/proto/proto.service';
import { vernite } from '@vernite/protobuf';
import { Injectable } from '@angular/core';

/**
 * Task proto service to monitor task events
 */
@Injectable({
  providedIn: 'root',
})
export class TaskProtoService {
  /**
   * Task updated event
   */
  public readonly TASK_UPDATED = this.protoService.get<vernite.Task>(
    vernite.Task,
    vernite.BasicAction.UPDATED,
  );

  /**
   * Task added event
   */
  public readonly TASK_ADDED = this.protoService.get<vernite.Task>(
    vernite.Task,
    vernite.BasicAction.ADDED,
  );

  /**
   * Task removed event
   */
  public readonly TASK_REMOVED = this.protoService.get<vernite.Task>(
    vernite.Task,
    vernite.BasicAction.REMOVED,
  );

  /**
   * Task list event
   */
  public readonly TASKS = this.protoService.get<vernite.Task>(vernite.Task);

  constructor(private protoService: ProtoService) {}
}
