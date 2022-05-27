import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss'],
})
export class ListGroupComponent implements OnInit {
  @Input() label!: string;

  constructor() {}

  ngOnInit() {}
}
