import { FocusableOption } from '@angular/cdk/a11y';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements FocusableOption {
  @Input() variant: 'primary' | 'secondary' | 'important' = 'secondary';
  @Input() pending?: boolean = false;
  @Input() icon?: string | IconDefinition;

  @ViewChild('btn') button!: ElementRef<HTMLButtonElement>;

  constructor() {}

  focus() {
    setTimeout(() => {
      this.button.nativeElement.focus();
    }, 200);
  }
}
