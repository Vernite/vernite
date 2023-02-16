import { Component, OnInit } from '@angular/core';
import { DialogOutlet } from '@main/services/dialog/dialog.service';
import { RouterExtensionsService } from '@main/services/router-extensions/router-extensions.service';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { ProtoService } from '../../services/proto/proto.service';
import { UserService } from '../../../auth/services/user/user.service';
import { environment } from './../../../../environments/environment';

/**
 * Main view component
 */
@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {
  /** application version */
  public version = environment.version;

  /** dialog outlet */
  public DialogOutlet = DialogOutlet;

  /** hide navigation */
  public hideNavigation = false;

  /** sidebar width */
  public sidebarWidth = 250;

  constructor(
    private routerExtensions: RouterExtensionsService,
    private protoService: ProtoService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    const data = this.routerExtensions.snapshot.data;
    this.hideNavigation = data.hideNavigation;

    this.authService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      if (!isLoggedIn) return;

      this.protoService.connect();
      this.userService.loadLocale();
    });
  }
}
