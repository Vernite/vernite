import { NgModule } from '@angular/core';
import { AuditLogProjectEntriesPipe } from './pipes/audit-log-project-entries/audit-log-project-entries.pipe';
import { AuditLogComponent } from './components/audit-log/audit-log.component';
import { MainModule } from '../../_main.module';
import { AuditLogEntryComponent } from './components/audit-log-entry/audit-log-entry.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AuditLogProjectEntriesPipe, AuditLogComponent, AuditLogEntryComponent],
  imports: [CommonModule, RouterModule, MainModule],
  exports: [AuditLogComponent],
})
export class AuditLogModule {}
