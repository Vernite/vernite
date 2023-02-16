import { ProtoService } from '@main/services/proto/proto.service';
import { Injectable } from '@angular/core';
import { BasicAction, Task } from '@proto/vernite';

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
  public readonly TASK_UPDATED = this.protoService.get(Task, BasicAction.UPDATED);

  /**
   * Task added event
   */
  public readonly TASK_ADDED = this.protoService.get(Task, BasicAction.ADDED);

  /**
   * Task removed event
   */
  public readonly TASK_REMOVED = this.protoService.get(Task, BasicAction.REMOVED);

  /**
   * Task list event
   */
  public readonly TASKS = this.protoService.get(Task);

  constructor(private protoService: ProtoService) {}
}
