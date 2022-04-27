import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-element',
  templateUrl: './nav-element.component.html',
  styleUrls: ['./nav-element.component.scss'],
})
export class NavElementComponent implements OnInit {
  @Input()
  public routerLink?: string;

  constructor() {}

  ngOnInit() {}
}
