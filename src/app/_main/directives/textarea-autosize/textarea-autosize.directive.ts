import { Directive, Input, HostBinding, Optional, OnInit } from '@angular/core';
import { NgControl, AbstractControl } from '@angular/forms';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { startWith } from 'rxjs';

@UntilDestroy()
@Directive({
  selector: 'textarea[autosize]',
})
export class TextareaAutosizeDirective implements OnInit {
  @HostBinding('rows')
  public rows!: number;

  @Input()
  public minRows: number = 1;

  @Input()
  public maxRows: number = 10;

  @HostBinding('style.max-height')
  public maxHeight: string = '400px';

  private _control?: AbstractControl;

  constructor(@Optional() private ngControl: NgControl) {}

  ngOnInit() {
    console.log('ngOnInit', this.ngControl.control);
    if (this.ngControl.control) {
      return this.ngOnControlInit();
    }

    const _setUpControl = (this.ngControl as any)._setUpControl;
    (this.ngControl as any)._setUpControl = (...args: any[]) => {
      const tmp = _setUpControl.apply(this.ngControl, ...args);

      this.ngOnControlInit();
      return tmp;
    };
  }

  ngOnControlInit() {
    this._control = this.ngControl.control!;
    this._control.valueChanges
      .pipe(startWith(null), untilDestroyed(this))
      .subscribe(() => this.resize());
  }

  private resize() {
    if (this._control?.value) {
      this.rows = Math.min(
        this.maxRows,
        Math.max(this.minRows, this._control.value.split('\n').length),
      );
    } else {
      this.rows = this.minRows;
    }
  }
}
