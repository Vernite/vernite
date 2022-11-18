import { Component, OnInit } from '@angular/core';
import { DialogOutlet } from '@main/services/dialog/dialog.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { RouterExtensionsService } from '@main/services/router-extensions/router-extensions.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {
  public version = environment.version;

  public DialogOutlet = DialogOutlet;

  public hideNavigation = false;

  constructor(private routerExtensions: RouterExtensionsService) {}

  ngOnInit() {
    const data = this.routerExtensions.snapshot.data;
    this.hideNavigation = data.hideNavigation;
  }
}
