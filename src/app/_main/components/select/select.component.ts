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
import { NgControl } from '@angular/forms';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { ControlAccessor } from '@main/classes/control-accessor.class';
import { FormControl } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { isEqual, isNil } from 'lodash-es';
import { BehaviorSubject, filter, fromEvent, take } from 'rxjs';
import { InputComponent } from '../input/input.component';
import { EmptyOptionsComponent } from './empty-options/empty-options.component';
import { OptionComponent } from './option/option.component';
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
  @ContentChildren(EmptyOptionsComponent) emptyOptions?: QueryList<EmptyOptionsComponent>;

  /**
   * Floating label text to display
   */
  @Input() floatingLabel?: string;

  /**
   * @TODO: Add documentation
   */
  @Input() comparer?: string;

  /**
   * @TODO: Add documentation
   */
  @Input() allowResizeByError?: boolean;

  isOpen$ = new BehaviorSubject<boolean>(false);
  selected$ = new BehaviorSubject<SelectLabel>({
    control: new FormControl(''),
  });

  /** @ignore */
  overlayMinWidth = 0;

  /** @ignore */
  faChevronDown = faChevronDown;

  constructor(ngControl: NgControl, cdRef: ChangeDetectorRef) {
    super(ngControl, cdRef);
  }

  public open() {
    this.overlayMinWidth = this.input.input.nativeElement.clientWidth;
    setTimeout(() => {
      fromEvent(document, 'click')
        .pipe(
          untilDestroyed(this),
          filter((e) => !this.overlay?.nativeElement.contains(e.target as Node)),
          take(1),
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
    let activeOption = null;

    if (!this.queryOptions || this.queryOptions.length === 0) {
      this.showEmptyOptions();
      return;
    } else {
      this.hideEmptyOptions();
    }

    this.queryOptions.forEach((option, index) => {
      option.ref.nativeElement.addEventListener('click', () => {
        this.select(this.queryOptions?.get(index)!);
      });

      if (this.compare(option.value, this.control.value)) {
        activeOption = option;
      }
    });

    this.setActiveOption(activeOption);

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
    this.close();
    if (this.sameAsSelected(option)) return;

    this.setActiveOption(option);
    this.control.setValue(isNil(option?.value) ? null : option!.value);
    if (option) option.selected = true;
  }

  private compare(a: any, b: any) {
    const { comparer } = this;

    if (comparer && a && b && (a[comparer] !== undefined || b[comparer] !== undefined)) {
      return a[comparer] === b[comparer];
    } else {
      return a == b || isEqual(a, b);
    }
  }

  private showEmptyOptions() {
    this.emptyOptions?.forEach((emptyOption) => {
      emptyOption.show();
    });
  }

  private hideEmptyOptions() {
    this.emptyOptions?.forEach((emptyOption) => {
      emptyOption.hide();
    });
  }

  override ngAfterControlInit(): void {
    if (!this.control) return;

    this.control.touch$.pipe(untilDestroyed(this)).subscribe(() => {
      this.selected$.value.control.markAsTouched();
    });

    this.control.errors$.pipe(untilDestroyed(this)).subscribe((errors) => {
      this.selected$.value.control.setErrors(errors);
    });
  }
}
