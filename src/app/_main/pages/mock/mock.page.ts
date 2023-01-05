import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/**
 * Mock page - display image
 */
@Component({
  selector: 'app-mock',
  templateUrl: './mock.page.html',
  styleUrls: ['./mock.page.scss'],
})
export class MockPage implements OnInit {
  /**
   * Image to display
   */
  public image: string = '';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ image }) => {
      this.image = image;
    });
  }
}
