import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { ControlAccessor } from '@main/classes/control-accessor.class';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-input-date-time',
  templateUrl: './input-date-time.component.html',
  styleUrls: ['./input-date-time.component.scss'],
})
export class InputDateTimeComponent extends ControlAccessor implements OnInit {
  @Input()
  placeholder: string = '';

  @Input()
  floatingLabel?: string;

  public changedDate: FormControl = new FormControl();

  @ViewChild('input-date-time') picker!: ElementRef<HTMLInputElement>;

  constructor(public override ngControl: NgControl) {
    super(ngControl);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.changedDate.valueChanges.subscribe((date) =>
      this.control.setValue(this.changeDate(date), { emitEvent: false }),
    );
  }

  override writeValue(value: any): void {
    this.changedDate.setValue(this.changeDate(value));
  }

  changeDate(date: number) {
    let sessionDate = dayjs(date);

    return sessionDate.format('YYYY-MM-DD');
  }
}
