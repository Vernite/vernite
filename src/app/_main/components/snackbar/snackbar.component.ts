import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { SnackbarService } from '@main/services/snackbar/snackbar.service';
import { uniqueId } from 'lodash-es';
import { SnackbarData } from './snackbar.interface';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  faClose = faClose;

  @Input()
  public uid: string = uniqueId();

  @Input()
  public message!: SnackbarData['message'];

  @Input()
  public duration: SnackbarData['duration'] = 4000;

  @Input()
  public color: SnackbarData['color'] = 'gray';

  @HostBinding('style.animation-name')
  public animationName: string = 'open';

  public get colorStyle(): string {
    switch (this.color) {
      case 'gray':
        return 'var(--color-gray-500)';
      case 'green':
        return '#00b300';
    }
  }

  constructor(private snackbarService: SnackbarService) {}

  ngOnInit() {
    setTimeout(() => {
      this.close();
    }, this.duration);
  }

  close() {
    this.setAnimationName('close');
    setTimeout(() => {
      this.snackbarService.close(this.uid);
    }, 1000);
  }

  setAnimationName(name: string) {
    this.animationName = name;
  }
}
