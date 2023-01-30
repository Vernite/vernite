import { Component } from '@angular/core';
import { SnackbarService } from '@main/services/snackbar/snackbar.service';
import { SnackbarData } from '../snackbar/snackbar.interface';

/**
 * Snackbar outlet component
 */
@Component({
  selector: 'app-snackbar-outlet',
  templateUrl: './snackbar-outlet.component.html',
  styleUrls: ['./snackbar-outlet.component.scss'],
})
export class SnackbarOutletComponent {
  /**
   * List of snackbars in outlet
   */
  public snackbarsList$ = this.snackbarService.snackbarsList$;

  constructor(private snackbarService: SnackbarService) {}

  /**
   * Track snackbar tuple by uid
   * @param _index index in array
   * @param param1 snackbar uid and data
   * @returns snackbar uid
   */
  trackSnackbarTuple(_index: number, [uid, _]: [string, SnackbarData]) {
    return uid;
  }
}
