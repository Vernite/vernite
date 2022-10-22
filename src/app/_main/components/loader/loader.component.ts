import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  @HostBinding('style.width') @HostBinding('style.height') @Input() size = '1rem';
}
