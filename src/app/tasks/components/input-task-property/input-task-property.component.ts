import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'input-task-property',
  templateUrl: './input-task-property.component.html',
  styleUrls: ['./input-task.property.component.scss'],
})
export class InputTaskPropertyComponent {
  @Input() label: string = '';

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
  @Output() isOpenChange = new EventEmitter<boolean>();
  private _isOpen: boolean = false;

  @ViewChild('content') content!: ElementRef<HTMLElement>;

  targetHeight: number = 0;
  currentHeight: string = '0';

  /** @ignore */
  faPlus = faPlus;

  /** @ignore */
  faMinus = faMinus;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}
