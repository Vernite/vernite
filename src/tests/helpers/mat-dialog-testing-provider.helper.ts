import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/** Simple providers wrapper for matDialog */
export const MatDialogTestingProvider = [
  MatDialogModule,
  { provide: MAT_DIALOG_DATA, useValue: {} },
  { provide: MatDialogRef, useValue: {} },
];
