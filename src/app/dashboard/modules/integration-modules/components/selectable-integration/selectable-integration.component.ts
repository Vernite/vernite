import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { ControlAccessor } from '@main/classes/control-accessor.class';

@Component({
  selector: 'selectable-integration',
  templateUrl: './selectable-integration.component.html',
  styleUrls: ['./selectable-integration.component.scss'],
})
export class SelectableIntegrationComponent extends ControlAccessor<boolean> {
  @Input() title!: string;
  @Input() description!: string;
  @Input() icon!: string | IconDefinition;

  /** @ignore */
  faCircle = faCircle;

  /** @ignore */
  faCircleCheck = faCircleCheck;

  toggle() {
    this.control.setValue(!this.control.value);
  }
}
