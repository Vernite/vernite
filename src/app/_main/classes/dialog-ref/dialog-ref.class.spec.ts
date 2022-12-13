import { MatDialogState } from '@angular/material/dialog';
import { firstValueFrom, map } from 'rxjs';
import { DialogRef } from './dialog-ref.class';

const mockOpenDialog = (dialogRef: DialogRef) => {
  (dialogRef as any).afterOpened$.next();
  return dialogRef;
};

const mockCloseDialog = (dialogRef: DialogRef) => {
  (dialogRef as any).close();
  return dialogRef;
};

describe('DialogRef', () => {
  it('should create', () => {
    const dialogRef = new DialogRef();
    expect(dialogRef).toBeTruthy();
  });

  it('afterOpened - should receive notification after dialog was opened', async () => {
    const dialogRef = new DialogRef();
    const promise = firstValueFrom(dialogRef.afterOpened().pipe(map((_) => dialogRef.getState())));

    mockOpenDialog(dialogRef);
    const result = await promise;
    expect(result).toEqual(MatDialogState.OPEN);
  });

  it('afterClosed - should receive notification after dialog was closed', async () => {
    const dialogRef = new DialogRef();
    const promise = firstValueFrom(dialogRef.afterClosed().pipe(map((_) => dialogRef.getState())));

    mockCloseDialog(dialogRef);
    const result = await promise;
    expect(result).toEqual(MatDialogState.CLOSED);
  });

  it('beforeClosed - should receive notification before dialog was closed', async () => {
    const dialogRef = new DialogRef();
    const promise = firstValueFrom(dialogRef.beforeClosed().pipe(map((_) => dialogRef.getState())));

    mockCloseDialog(dialogRef);
    const result = await promise;
    expect(result).toEqual(MatDialogState.CLOSING);
  });

  it('backdropClick - should throw error', async () => {
    const dialogRef = new DialogRef();
    expect(() => {
      dialogRef.backdropClick();
    }).toThrow();
  });

  it('keydownEvents - should throw error', async () => {
    const dialogRef = new DialogRef();
    expect(() => {
      dialogRef.keydownEvents();
    }).toThrow();
  });

  it('updatePosition - should throw error', async () => {
    const dialogRef = new DialogRef();
    expect(() => {
      dialogRef.updatePosition();
    }).toThrow();
  });

  it('updateSize - should throw error', async () => {
    const dialogRef = new DialogRef();
    expect(() => {
      dialogRef.updateSize();
    }).toThrow();
  });

  it('addPanelClass - should throw error', async () => {
    const dialogRef = new DialogRef();
    expect(() => {
      dialogRef.addPanelClass('');
    }).toThrow();
  });

  it('removePanelClass - should throw error', async () => {
    const dialogRef = new DialogRef();
    expect(() => {
      dialogRef.removePanelClass('');
    }).toThrow();
  });
});
