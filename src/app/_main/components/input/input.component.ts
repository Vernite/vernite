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

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent extends ControlAccessor {
  @Input() type: 'text' | 'number' | 'email' | 'password' = 'text';
  @Input() floatingLabel?: string;
  @Input() staticLabel?: string;
  @Input() placeholder: string = '';
  @Input() hint?: string;
}
