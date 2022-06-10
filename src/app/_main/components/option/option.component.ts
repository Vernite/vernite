import { Component, ElementRef, Input } from '@angular/core';
import { faQuestion, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent {
  @Input() value!: any;
  @Input() icon?: string | IconDefinition;

  faQuestion = faQuestion;

  public get viewValue(): string {
    return this.ref.nativeElement.innerText;
  }

  constructor(private ref: ElementRef) {}
}
