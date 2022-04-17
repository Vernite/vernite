import {
  AfterViewInit,
  Component,
  forwardRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormControlName,
  NgControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
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
}
