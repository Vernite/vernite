import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-restore-account-page',
  templateUrl: './restore-account.page.html',
  styleUrls: ['./restore-account.page.scss'],
})
export class RestoreAccountPage {
  constructor(private authService: AuthService, private router: Router) {}

  logOut() {
    this.authService.logout().subscribe();
  }

  restore() {
    this.authService.recoverAccount().subscribe();
  }
}
