import { ControlAccessor } from '@main/classes/control-accessor.class';
import { ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ValidationError } from '@main/interfaces/validation-error.interface';
import { requiredValidator } from '@main/validators/required.validator';
import { TaskType } from '@tasks/enums/task-type.enum';
import { TaskService } from '../../services/task/task.service';
import { Task } from '@tasks/interfaces/task.interface';
import { TaskTypeHierarchy } from '../../enums/task-type.enum';
import { TaskFilters } from '@tasks/filters/task.filters';
import { isNil } from 'lodash-es';

@Component({
  selector: 'input-task-parent',
  templateUrl: './input-task-parent.component.html',
})
export class InputTaskParentComponent
  extends ControlAccessor<number | null | ''>
  implements OnDestroy
{
  @Input() set projectId(value: number) {
    this._projectId = value;
    if (!isNil(value)) {
      this.loadTasks();
    }
  }

  @Input() set type(value: TaskType | undefined) {
    this._type = value;
    if (!isNil(value)) {
      this.loadTasks();
    }
  }

  get projectId() {
    return this._projectId;
  }

  set isOpen(value: boolean) {
    if (value) this.control.setValue('');
    else this.control.setValue(null);
  }

  get isOpen() {
    return this.control.value !== null;
  }

  private _projectId: number = 0;
  private _type?: TaskType;

  tasks$: Observable<Task[]> = of([]);

  constructor(ngControl: NgControl, cdRef: ChangeDetectorRef, private taskService: TaskService) {
    super(ngControl, cdRef);
  }

  loadTasks() {
    const { projectId } = this;
    this.tasks$ = this.taskService.list(projectId, TaskFilters.TYPES(this.getAvailableTypes()));
  }

  getAvailableTypes() {
    if (isNil(this._type)) return [];

    return Object.entries(TaskTypeHierarchy)
      .filter(
        ([key, value]) => value.includes(this._type!) && (key as any as TaskType) != TaskType.EPIC,
      )
      .map(([key]) => key as any as TaskType);
  }

  override validate(control: AbstractControl): ValidationError | null {
    if (this.isOpen && !this.control.value) return requiredValidator()(control) as ValidationError;
    return null;
  }

  override ngAfterControlInit(): void {
    this.cdRef.detectChanges();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.control.setValue(null);
  }
}
