import { ControlAccessor } from '@main/classes/control-accessor.class';
import { ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ValidationError } from '@main/interfaces/validation-error.interface';
import { requiredValidator } from '@main/validators/required.validator';
import { Task } from '@tasks/interfaces/task.interface';
import { TaskService } from '@tasks/services/task.service';

@Component({
  selector: 'input-epic',
  templateUrl: './input-epic.component.html',
})
export class InputEpicComponent
  extends ControlAccessor<Task['id'] | null | ''>
  implements OnDestroy
{
  @Input() set projectId(value: number) {
    this._projectId = value;
    if (value) {
      this.loadEpics();
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
    return this.control.value != null;
  }

  private _projectId: number = 0;

  epics$: Observable<Task[]> = of([]);

  constructor(ngControl: NgControl, cdRef: ChangeDetectorRef, private taskService: TaskService) {
    super(ngControl, cdRef);
  }

  loadEpics() {
    this.epics$ = this.taskService.listEpics(this.projectId);
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
