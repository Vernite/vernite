import { Component } from '@angular/core';
import { SnackbarService } from '@main/services/snackbar/snackbar.service';
import { SnackbarData } from '../snackbar/snackbar.interface';

@Component({
  selector: 'app-snackbar-outlet',
  templateUrl: './snackbar-outlet.component.html',
  styleUrls: ['./snackbar-outlet.component.scss'],
})
export class SnackbarOutletComponent {
  public snackbarsList$ = this.snackbarService.snackbarsList$;

  constructor(private snackbarService: SnackbarService) {}

  trackSnackbarTuple(_index: number, [uid, _]: [string, SnackbarData]) {
    return uid;
  }
}
