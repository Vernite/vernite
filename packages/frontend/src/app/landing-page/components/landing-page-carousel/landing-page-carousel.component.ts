import { Component, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-page-carousel',
  templateUrl: './landing-page-carousel.component.html',
  styleUrls: ['./landing-page-carousel.component.scss'],
})
export class LandingPageCarouselComponent {
  @ViewChildren('image') images!: QueryList<ElementRef<HTMLImageElement>>;

  public currentImageIndex = 0;

  public transform = 'translateX(0)';

  /** @ignore */
  faChevronLeft = faChevronLeft;

  /** @ignore */
  faChevronRight = faChevronRight;

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    this.transform = `translateX(-${this.currentImageIndex * 100}%)`;
  }

  previousImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    this.transform = `translateX(-${this.currentImageIndex * 100}%)`;
  }

  setImage(index: number) {
    this.currentImageIndex = index;
    this.transform = `translateX(-${this.currentImageIndex * 100}%)`;
  }
}
