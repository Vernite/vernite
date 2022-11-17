import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { IconDefinition, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent {
  @Input() @HostBinding('value') value!: any;
  @Input() icon?: string | IconDefinition;
  @Input() checkmark?: boolean;

  selected = false;

  faCheck = faCheck;

  public get viewValue(): string {
    return this.ref.nativeElement.innerText;
  }

  constructor(public ref: ElementRef) {}
}
