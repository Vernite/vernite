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
import { BehaviorSubject, filter, take, startWith, tap } from 'rxjs';
import { InputComponent } from '../input/input.component';
import { EmptyOptionsComponent } from './empty-options/empty-options.component';
import { OptionComponent } from './option/option.component';
import { Selection } from './select-label.model';

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

  @Input() multiple?: boolean;

  isOpen: boolean = false;

  selectedOptions$ = new BehaviorSubject<OptionComponent[]>([]);
  _sub = this.selectedOptions$.pipe(untilDestroyed(this)).pipe(tap(console.log)).subscribe();
  labelControl = new FormControl();

  /** @ignore */
  overlayMinWidth = 0;

  /** @ignore */
  faChevronDown = faChevronDown;

  constructor(ngControl: NgControl, cdRef: ChangeDetectorRef) {
    super(ngControl, cdRef);
  }

  public openOverlay() {
    this.isOpen = true;
    this.overlayMinWidth = this.input.input.nativeElement.clientWidth;
  }

  public closeOverlay() {
    this.isOpen = false;
  }

  public toggleOverlay() {
    if (this.isOpen) {
      return this.closeOverlay();
    }
    return this.openOverlay();
  }

  public ngAfterViewInit(): void {
    this.loadOptions();

    this.control.valueChanges.subscribe(() => {
      console.log('Value changed');
      this.clearSelection();

      this.queryOptions?.forEach((option) => {
        if (this.compare(option.value, this.control.value)) {
          this.setAsSelected(option);
        }
      });
    });

    this.queryOptions?.changes.subscribe(() => {
      this.loadOptions();
    });
  }

  private loadOptions() {
    console.log('Loading options');
    this.clearSelection();

    this.queryOptions?.forEach((option) => {
      option.ref.nativeElement.addEventListener('click', () => {
        this.onOptionClick(option);
      });

      console.log(
        'Comparing',
        option.value,
        this.control.value,
        this.compare(option.value, this.control.value),
      );
      if (this.compare(option.value, this.control.value)) {
        this.setAsSelected(option);
      }
    });

    this.cdRef.detectChanges();
  }

  private clearSelection() {
    if (this.queryOptions) {
      for (const option of this.queryOptions.toArray()) {
        console.log('Clearing selection', option);
        option.selected = false;
      }
    }
    this.selectedOptions$.next([]);
  }

  private setAsSelected(option: OptionComponent | OptionComponent[] | null) {
    console.log('Setting as selected', option);
    const currentlySelected = this.selectedOptions$.value;

    const setOptionAsSelected = (option: OptionComponent) => {
      option.selected = true;
      currentlySelected.push(option);
    };

    if (Array.isArray(option)) {
      option.forEach((option) => setOptionAsSelected(option));
    } else if (option) {
      setOptionAsSelected(option);
    }

    this.selectedOptions$.next(currentlySelected);
    if (this.multiple) {
      this.labelControl.setValue(' ');
    } else if (option && !Array.isArray(option)) {
      console.log('Setting label control value', option.viewValue);
      this.labelControl.setValue(option.viewValue);
    }
    console.log('Selected options', this.selectedOptions$.value);
  }

  public select(option: OptionComponent) {
    this.setAsSelected(option);
    if (!this.multiple) {
      this.control.setValue(this.selectedOptions$.value[0].value);
    } else {
      this.control.setValue(this.selectedOptions$.value.map((option) => option.value));
    }
    option.selected = true;
  }

  public deselect(option: OptionComponent) {
    console.log('Deselecting', option);
    const currentlySelected = this.selectedOptions$.value;
    const index = currentlySelected.findIndex((selectedOption) => option === selectedOption);

    if (index > -1) {
      currentlySelected.splice(index, 1);
      option.selected = false;
      this.selectedOptions$.next(currentlySelected);
    }

    this.control.setValue(this.selectedOptions$.value.map((option) => option.value));

    console.log(currentlySelected.length);
    if (currentlySelected.length === 0) {
      this.labelControl.setValue('');
    }
  }

  public toggleSelection(option: OptionComponent) {
    if (option.selected) {
      this.deselect(option);
    } else {
      this.select(option);
    }
  }

  private compare(a: any, b: any) {
    const { comparer } = this;

    if (comparer && a && b && (a[comparer] !== undefined || b[comparer] !== undefined)) {
      return a[comparer] === b[comparer];
    } else {
      return a == b || isEqual(a, b);
    }
  }

  private onOptionClick(option: OptionComponent) {
    if (this.multiple) {
      this.toggleSelection(option);
    } else {
      this.select(option);
    }

    this.closeOverlay();
  }

  /**
   * @deprecated
   */
  private showEmptyOptions() {
    this.emptyOptions?.forEach((emptyOption) => {
      emptyOption.show();
    });
  }

  /**
   * @deprecated
   */
  private hideEmptyOptions() {
    this.emptyOptions?.forEach((emptyOption) => {
      emptyOption.hide();
    });
  }

  override ngAfterControlInit(): void {
    if (!this.control) return;

    this.control.touch$.pipe(untilDestroyed(this)).subscribe(() => {
      this.labelControl.markAsTouched();
    });

    this.control.errors$.pipe(untilDestroyed(this)).subscribe((errors) => {
      this.labelControl.setErrors(errors);
    });
  }
}
