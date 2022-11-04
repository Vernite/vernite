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
  AfterViewInit,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { isString } from 'lodash-es';
import { ControlAccessor } from '../../classes/control-accessor.class';

/**
 * Default text input component
 */
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent extends ControlAccessor implements AfterViewInit {
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

  @Input() pending?: boolean;

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() focus: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** @ignore */
  @HostBinding('class.focused') focused: boolean = false;

  /** @ignore */
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  public autofilledByBrowser: boolean = false;

  constructor(
    public override ngControl: NgControl,
    private autofillMonitor: AutofillMonitor,
    cdRef: ChangeDetectorRef,
  ) {
    super(ngControl, cdRef);
  }

  ngAfterViewInit(): void {
    this.autofillMonitor.monitor(this.input.nativeElement).subscribe(() => {
      this.autofilledByBrowser = true;
    });
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

  override writeValue(value: any): void {
    super.writeValue(value);
    this.autofilledByBrowser = false;
  }

  override parseValue(value: any) {
    console.log(value);

    if (this.type === 'number') {
      return isString(value) ? parseFloat(value) : value;
    }
    return value;
  }
}
