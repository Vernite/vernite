import { Component, Input } from '@angular/core';
import { AuditLog } from '../../interfaces/audit-log.interface';

@Component({
  selector: 'audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss'],
})
export class AuditLogComponent {
  @Input() auditLogs!: AuditLog<any>[];

  @Input() noScroll: boolean = false;

  public trackByAuditLog(index: number, auditLog: AuditLog<any>) {
    return auditLog.date;
  }
}
