import { Component, OnInit } from '@angular/core';
import { faGlobe, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  faUser = faUser;
  faGlobe = faGlobe;

  constructor() {}

  ngOnInit() {}
}
