import { AutofillMonitor } from '@angular/cdk/text-field';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { ControlAccessor } from '../../classes/control-accessor.class';

/**
 * Default text input component
 */
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent extends ControlAccessor {
  /**
   * Type of the input
   */
  @Input() type: 'text' | 'number' | 'email' | 'password' = 'text';

  /**
   * Floating label text to display
   */
  @Input() floatingLabel?: string;

  /**
   * Static label text to display
   */
  @Input() staticLabel?: string;

  /**
   * Input placeholder text
   */
  @Input() placeholder: string = '';

  /**
   * Hint to display beneath the input to provide additional information of how to use the input
   */
  @Input() hint?: string;

  /**
   * Attribute to disable value edition without any visual changes
   */
  @Input() readonly?: boolean;

  @Input() allowResizeByError?: boolean;

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() focus: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** @ignore */
  @HostBinding('class.focused') focused = false;

  /** @ignore */
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  constructor(
    public override ngControl: NgControl,
    private autofillMonitor: AutofillMonitor,
    cdRef: ChangeDetectorRef,
  ) {
    super(ngControl, cdRef);
  }

  /** @ignore */
  onFocus() {
    this.focused = true;
    this.focus.emit(true);
  }

  /** @ignore */
  onBlur() {
    this.focused = false;
    this.focus.emit(false);
  }
}
