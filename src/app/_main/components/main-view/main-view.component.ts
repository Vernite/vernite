import { Component, OnInit } from '@angular/core';
import { DialogOutlet } from '@main/services/dialog/dialog.service';
import { environment } from 'src/environments/environment';
import { RouterExtensionsService } from '@main/services/router-extensions/router-extensions.service';

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

  constructor(private routerExtensions: RouterExtensionsService) {}

  ngOnInit() {
    const data = this.routerExtensions.snapshot.data;
    this.hideNavigation = data.hideNavigation;
  }
}
