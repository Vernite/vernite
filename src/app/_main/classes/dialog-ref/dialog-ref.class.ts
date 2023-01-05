import { DialogPosition, MatDialogState } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

/**
 * Dialog reference class. Used to control dialog.
 */
export class DialogRef<R = any> {
  /** Subject emitted after opening the dialog */
  private afterOpened$ = new Subject<void>();

  /** Subject emitted before closing the dialog */
  private beforeClosed$ = new Subject<R | undefined>();

  /** Subject emitted after closing the dialog */
  private afterClosed$ = new Subject<R | undefined>();

  /** Observer of the state of the dialog */
  private state$ = new BehaviorSubject<MatDialogState>(MatDialogState.CLOSED);

  /**
   * Close the dialog.
   * @param dialogResult dialog result
   */
  close(dialogResult?: R): void {
    this.state$.next(MatDialogState.CLOSING);
    this.beforeClosed$.next(dialogResult);
    this.state$.next(MatDialogState.CLOSED);
    this.afterClosed$.next(dialogResult);

    this.afterClosed$.complete();
    this.afterOpened$.complete();
    this.beforeClosed$.complete();
    this.state$.complete();
  }

  /**
   * Gets an observable that is notified when the dialog is finished opening.
   */
  afterOpened(): Observable<void> {
    this.state$.next(MatDialogState.OPEN);
    return this.afterOpened$;
  }

  /**
   * Gets an observable that is notified when the dialog is finished closing.
   */
  afterClosed(): Observable<R | undefined> {
    return this.afterClosed$;
  }

  /**
   * Gets an observable that is notified when the dialog has started closing.
   */
  beforeClosed(): Observable<R | undefined> {
    return this.beforeClosed$;
  }

  /**
   * Gets an observable that emits when the overlay's backdrop has been clicked.
   */
  backdropClick(): Observable<MouseEvent> {
    throw new Error(`method should not be called when using custom outlet`);
  }

  /**
   * Gets an observable that emits when keydown events are targeted on the overlay.
   */
  keydownEvents(): Observable<KeyboardEvent> {
    throw new Error('Method not implemented.');
  }

  /**
   * Updates the dialog's position.
   * @param position New dialog position.
   */
  updatePosition(position?: DialogPosition): this {
    throw new Error(`method not be called when using custom outlet`);
  }

  /**
   * Updates the dialog's width and height.
   * @param width New width of the dialog.
   * @param height New height of the dialog.
   */
  updateSize(width?: string, height?: string): this {
    throw new Error(`method should not be called when using custom outlet`);
  }

  /** Add a CSS class or an array of classes to the overlay pane. */
  addPanelClass(classes: string | string[]): this {
    throw new Error(`method should not be called when using custom outlet`);
  }

  /** Remove a CSS class or an array of classes from the overlay pane. */
  removePanelClass(classes: string | string[]): this {
    throw new Error(`method should not be called when using custom outlet`);
  }

  /** Gets the current state of the dialog's lifecycle. */
  getState(): MatDialogState {
    return this.state$.value;
  }
}
