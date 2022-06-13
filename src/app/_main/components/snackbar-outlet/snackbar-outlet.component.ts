import { Component } from '@angular/core';
import { SnackbarService } from '@main/services/snackbar.service';
import { SnackbarData } from '../snackbar/snackbar.interface';

@Component({
  selector: 'app-snackbar-outlet',
  templateUrl: './snackbar-outlet.component.html',
  styleUrls: ['./snackbar-outlet.component.scss'],
})
export class SnackbarOutletComponent {
  public snackbars$ = this.snackbarService.snackbars$;

  constructor(private snackbarService: SnackbarService) {}

  trackSnackbarTuple(_index: number, [uid, _]: [string, SnackbarData]) {
    return uid;
  }
}
