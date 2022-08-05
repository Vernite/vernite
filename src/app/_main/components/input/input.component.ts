import { AutofillMonitor } from '@angular/cdk/text-field';
import { Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
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

  /** @ignore */
  @HostBinding('class.focused') focused = false;

  /** @ignore */
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  constructor(public override ngControl: NgControl, private autofillMonitor: AutofillMonitor) {
    super(ngControl);
  }

  /** @ignore */
  onFocus() {
    this.focused = true;
  }

  /** @ignore */
  onBlur() {
    this.focused = false;
  }
}
