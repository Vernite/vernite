import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { ControlAccessor } from '@main/classes/control-accessor.class';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { isEqual } from 'lodash-es';
import { BehaviorSubject, filter, fromEvent, take } from 'rxjs';
import { InputComponent } from '../input/input.component';
import { OptionComponent } from '../option/option.component';
import { SelectLabel } from './select-label.model';

@UntilDestroy()
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent extends ControlAccessor implements AfterViewInit {
  @ViewChild('input') input!: InputComponent;
  @ViewChild('overlay') overlay!: ElementRef<HTMLElement>;
  @ContentChildren(OptionComponent) queryOptions?: QueryList<OptionComponent>;

  @Input() floatingLabel?: string;
  @Input() comparer?: string;

  isOpen$ = new BehaviorSubject<boolean>(false);
  selected$ = new BehaviorSubject<SelectLabel>({
    control: new FormControl(''),
  });

  overlayMinWidth = 0;

  /** @ignore */
  faChevronDown = faChevronDown;

  constructor(ngControl: NgControl, private cdRef: ChangeDetectorRef) {
    super(ngControl);
  }

  public open() {
    this.overlayMinWidth = this.input.input.nativeElement.clientWidth;
    setTimeout(() => {
      fromEvent(document, 'click')
        .pipe(
          take(1),
          untilDestroyed(this),
          filter((e) => !this.overlay?.nativeElement.contains(e.target as Node)),
        )
        .subscribe(() => this.close());
      this.isOpen$.next(true);
    });
  }

  public ngAfterViewInit(): void {
    this.loadOptions();

    this.control.valueChanges.subscribe(() => {
      this.loadOptions();
    });

    this.queryOptions?.changes.subscribe(() => {
      this.loadOptions();
    });
  }

  public close() {
    this.isOpen$.next(false);
  }

  public toggle() {
    if (this.isOpen$.value) {
      return this.close();
    }
    return this.open();
  }

  private loadOptions() {
    if (!this.queryOptions) return;

    this.queryOptions.forEach((option, index) => {
      option.ref.nativeElement.addEventListener('click', () => {
        this.select(this.queryOptions?.get(index)!);
      });

      if (this.compare(option.value, this.control.value)) {
        this.setActiveOption(option);
      }
    });

    this.cdRef.detectChanges();
  }

  private setActiveOption(option: OptionComponent | null) {
    const currentLabel = this.selected$.getValue();
    currentLabel.control.setValue(option?.viewValue || '');
    currentLabel.icon = option?.icon;
    currentLabel.optionComponent = option || undefined;
    this.selected$.next(currentLabel);
  }

  private sameAsSelected(option: OptionComponent | null) {
    return (
      this.selected$.value.optionComponent === option ||
      this.selected$.value.optionComponent?.value === option?.value
    );
  }

  public select(option: OptionComponent | null) {
    if (this.sameAsSelected(option)) return;

    this.setActiveOption(option);
    this.control.setValue(option?.value || null);
  }

  private compare(a: any, b: any) {
    const { comparer } = this;

    if (comparer && a && b && (a[comparer] !== undefined || b[comparer] !== undefined)) {
      return a[comparer] === b[comparer];
    } else {
      return a == b || isEqual(a, b);
    }
  }
}
