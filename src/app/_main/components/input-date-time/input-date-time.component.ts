import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ControlAccessor } from '@main/classes/control-accessor.class';

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

  @ViewChild('input-date-time') picker!: ElementRef<HTMLInputElement>;

  constructor(public override ngControl: NgControl) {
    super(ngControl);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
}
