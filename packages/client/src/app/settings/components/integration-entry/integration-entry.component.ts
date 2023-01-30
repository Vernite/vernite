import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Component to display integration entry in settings
 */
@Component({
  selector: 'app-integration-entry',
  templateUrl: './integration-entry.component.html',
  styleUrls: ['./integration-entry.component.scss'],
})
export class IntegrationEntryComponent {
  /** Integration object */
  @Input() integration?: any;

  /** Integration label */
  @Input() label!: string;

  /** Integration description */
  @Input() description?: string | null;

  /** Flag if integration is suspended */
  @Input() suspended: boolean = false;

  /** Disconnect button event emitter */
  @Output() disconnect = new EventEmitter<any>();
}
