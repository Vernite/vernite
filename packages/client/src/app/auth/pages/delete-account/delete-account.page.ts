import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth/auth.service';

/**
 * Delete account page component
 */
@Component({
  selector: 'app-delete-account.page',
  templateUrl: './delete-account.page.html',
  styleUrls: ['./delete-account.page.scss'],
})
export class DeleteAccountPage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    const { token } = this.activatedRoute.snapshot.queryParams;
    this.deleteAccount(token);
  }

  /**
   * Delete account
   * @param token - token to delete account
   */
  deleteAccount(token: string) {
    if (token) {
      this.authService.deleteAccount(token).subscribe(() => {});
    }
  }
}
