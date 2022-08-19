import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent {
  @Input() @HostBinding('value') value!: any;
  @Input() icon?: string | IconDefinition;

  selected = false;

  public get viewValue(): string {
    return this.ref.nativeElement.innerText;
  }

  constructor(public ref: ElementRef) {}
}
