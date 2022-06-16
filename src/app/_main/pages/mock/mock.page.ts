import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mock',
  templateUrl: './mock.page.html',
  styleUrls: ['./mock.page.scss'],
})
export class MockPage implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  public image: string = '';

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ image }) => {
      this.image = image;
    });
  }
}
