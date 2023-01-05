import { Component, HostBinding, Input } from '@angular/core';

/**
 * Loader component
 */
@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  /** Loader size */
  @HostBinding('style.width') @HostBinding('style.height') @Input() size = '1rem';
}
