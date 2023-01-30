import { Component, Input } from '@angular/core';
import { AuditLog } from '../../interfaces/audit-log.interface';

@Component({
  selector: 'audit-log-entry',
  templateUrl: './audit-log-entry.component.html',
  styleUrls: ['./audit-log-entry.component.scss'],
})
export class AuditLogEntryComponent {
  @Input() auditLog!: AuditLog<any>;
}
