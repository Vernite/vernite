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
import { ControlAccessor } from '@main/classes/control-accessor/control-accessor.class';
import { FormControl } from '@ngneat/reactive-forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { InputComponent } from '../input/input.component';
import { EmptyOptionsComponent } from './empty-options/empty-options.component';
import { OptionComponent } from './option/option.component';

/**
 * Select component
 */
@UntilDestroy()
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent extends ControlAccessor implements AfterViewInit {
  /** input element reference */
  @ViewChild('input') input!: InputComponent;

  /** overlay element reference */
  @ViewChild('overlay') overlay!: ElementRef<HTMLElement>;

  /** @ignore */
  @ContentChildren(OptionComponent) queryOptions?: QueryList<OptionComponent>;

  /** @ignore */
  @ContentChildren(EmptyOptionsComponent) emptyOptions?: QueryList<EmptyOptionsComponent>;

  /** Floating label text to display */
  @Input() floatingLabel?: string;

  /** Determine if input is pending */
  @Input() pending = false;

  /** Comparer property */
  @Input() comparer?: string;

  /** Flag to allow element to be resized by error message */
  @Input() allowResizeByError?: boolean;

  /** Flag to allow multiple selection */
  @Input() multiple?: boolean;

  /** Flag to mark input to be readonly */
  @Input() readonly?: boolean;

  /** if select is open */
  isOpen: boolean = false;

  /** Selected options list */
  selectedOptions$ = new BehaviorSubject<OptionComponent[]>([]);

  override displayControl = new FormControl();

  /** @ignore */
  overlayMinWidth = 0;

  /** @ignore */
  faChevronDown = faChevronDown;

  constructor(ngControl: NgControl, cdRef: ChangeDetectorRef) {
    super(ngControl, cdRef);
  }

  /**
   * Open select overlay
   */
  public openOverlay() {
    this.isOpen = true;
    this.overlayMinWidth = this.input.input.nativeElement.clientWidth;
  }

  /**
   * Close select overlay
   */
  public closeOverlay() {
    this.isOpen = false;
  }

  /**
   * Toggle select overlay
   */
  public toggleOverlay() {
    if (this.readonly) return;

    if (this.isOpen) {
      return this.closeOverlay();
    }
    return this.openOverlay();
  }

  public ngAfterViewInit(): void {
    this.loadOptions();

    this.control.valueChanges.subscribe((value) => {
      this.clearSelection();

      this.queryOptions?.forEach((option) => {
        if (this.compare(option.value, value)) {
          this.setAsSelected(option);
        }
      });
    });

    this.queryOptions?.changes.subscribe(() => {
      this.loadOptions();
    });
  }

  /**
   * Load select options
   */
  private loadOptions() {
    this.clearSelection();

    this.queryOptions?.forEach((option) => {
      option.ref.nativeElement.addEventListener('click', () => {
        this.onOptionClick(option);
      });

      if (this.compare(option.value, this.control.value)) {
        this.setAsSelected(option);
      }
    });

    this.cdRef.detectChanges();
  }

  /**
   * Clear selection from input
   */
  private clearSelection() {
    if (this.queryOptions) {
      for (const option of this.queryOptions.toArray()) {
        option.selected = false;
      }
    }
    this.selectedOptions$.next([]);
  }

  /**
   * Mark option as selected
   * @param option Option to select
   */
  private setAsSelected(option: OptionComponent | OptionComponent[] | null) {
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
      this.displayControl.setValue(' ');
    } else if (option && !Array.isArray(option)) {
      this.displayControl.setValue(option.viewValue);
    }
  }

  /**
   * Select option from overlay
   * @param option Option to select
   */
  public select(option: OptionComponent) {
    this.setAsSelected(option);
    if (!this.multiple) {
      this.control.setValue(this.selectedOptions$.value[0].value);
    } else {
      this.control.setValue(this.selectedOptions$.value.map((option) => option.value));
    }
  }

  /**
   * Deselect option from overlay
   * @param option Option to deselect
   */
  public deselect(option: OptionComponent) {
    const currentlySelected = this.selectedOptions$.value;
    const index = currentlySelected.findIndex((selectedOption) => option === selectedOption);

    if (index > -1) {
      currentlySelected.splice(index, 1);
      option.selected = false;
      this.selectedOptions$.next(currentlySelected);
    }

    this.control.setValue(this.selectedOptions$.value.map((option) => option.value));

    if (currentlySelected.length === 0) {
      this.displayControl.setValue('');
    }
  }

  /**
   * Toggle option selection
   * @param option Option to toggle selection
   */
  public toggleSelection(option: OptionComponent) {
    if (option.selected) {
      this.deselect(option);
    } else {
      this.select(option);
    }
  }

  /**
   * Compare two elements
   * @param a Element to compare
   * @param b Element to compare with
   * @returns True if elements are equal, false otherwise
   */
  private compare(a: any, b: any) {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.every((a) => b.some((b) => a === b));
    } else if (Array.isArray(b)) {
      return b.some((b) => a === b);
    } else {
      return a === b;
    }
  }

  /**
   * On option click event listener]
   * @param option option that was clicked
   */
  private onOptionClick(option: OptionComponent) {
    if (this.multiple) {
      this.toggleSelection(option);
    } else {
      this.clearSelection();
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

  override writeValue(value: any): void {
    super.writeValue(value);

    if (!value) {
      this.displayControl.setValue('');
    }
  }
}
