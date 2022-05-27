import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-integration-entry',
  templateUrl: './integration-entry.component.html',
  styleUrls: ['./integration-entry.component.scss'],
})
export class IntegrationEntryComponent implements OnInit {
  @Input() integration?: any;
  @Input() label!: string;
  @Input() description?: string | null;
  @Input() suspended: boolean = false;

  @Output() disconnect = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}
}
