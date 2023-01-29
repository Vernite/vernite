import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

/**
 * Component to display task property input
 */
@Component({
  selector: 'input-task-property',
  templateUrl: './input-task-property.component.html',
  styleUrls: ['./input-task.property.component.scss'],
})
export class InputTaskPropertyComponent {
  /** Label to show on property group */
  @Input() label: string = '';

  /** If property group is open */
  @Input() set isOpen(value: boolean) {
    this._isOpen = value;
    if (value) {
      this.currentHeight = `${this.targetHeight}px`;
      setTimeout(() => {
        this.currentHeight = 'none';
      }, 200);
    } else {
      this.currentHeight = '0';
    }
  }
  get isOpen() {
    return this._isOpen;
  }

  /** Event emitter to emit when property group is open */
  @Output() isOpenChange = new EventEmitter<boolean>();

  /** If property group is open */
  private _isOpen: boolean = false;

  /** Content reference to element in view */
  @ViewChild('content') content!: ElementRef<HTMLElement>;

  /** Target height of property group */
  targetHeight: number = 0;

  /** Current height of property group */
  currentHeight: string = '0';

  /** @ignore */
  faPlus = faPlus;

  /** @ignore */
  faMinus = faMinus;

  /** Open task property editing */
  open() {
    this.isOpen = true;
  }

  /** Close task property editing */
  close() {
    this.isOpen = false;
  }
}
