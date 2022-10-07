import { Component, OnInit } from '@angular/core';
import { DialogOutlet } from '@main/services/dialog/dialog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {
  public version = environment.version;

  public DialogOutlet = DialogOutlet;

  constructor() {}

  ngOnInit() {}
}
