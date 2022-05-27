import { Component, OnInit } from '@angular/core';
import { faCircleNodes, faGlobe, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  faUser = faUser;
  faGlobe = faGlobe;
  faCircleNodes = faCircleNodes;

  constructor() {}

  ngOnInit() {}
}
