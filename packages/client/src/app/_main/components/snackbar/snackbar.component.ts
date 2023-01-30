import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { SnackbarService } from '@main/services/snackbar/snackbar.service';
import { uniqueId } from 'lodash-es';
import { SnackbarData } from './snackbar.interface';

/**
 * Snackbar component
 */
@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  /** @ignore */
  faClose = faClose;

  /** Snackbar uid */
  @Input() public uid: string = uniqueId();

  /** Snackbar message */
  @Input() public message!: SnackbarData['message'];

  /** Snackbar duration */
  @Input() public duration: SnackbarData['duration'] = 4000;

  /** Snackbar color */
  @Input() public color: SnackbarData['color'] = 'gray';

  /** Animation name */
  @HostBinding('style.animation-name') public animationName: string = 'open';

  /** Convert color name to css color */
  public get colorStyle(): string {
    switch (this.color) {
      case 'gray':
        return 'var(--color-gray-500)';
      case 'green':
        return '#00b300';
      case 'red':
        return '#ff0000';
      case 'yellow':
        return '#ffff00';
      default:
        return 'var(--color-gray-500)';
    }
  }

  constructor(private snackbarService: SnackbarService) {}

  ngOnInit() {
    setTimeout(() => {
      this.close();
    }, this.duration);
  }

  /** Close snackbar */
  close() {
    this.setAnimationName('close');
    setTimeout(() => {
      this.snackbarService.close(this.uid);
    }, 1000);
  }

  /** Set animation name */
  setAnimationName(name: string) {
    this.animationName = name;
  }
}
