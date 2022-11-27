import { Injectable } from '@angular/core';
import { Service } from '@main/decorators/service/service.decorator';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Service()
@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {}

  init() {
    this.addSvgIcon('dashboard', '/assets/icons/dashboard.svg');

    this.addSvgIcon('epic', '/assets/icons/epic.svg');
    this.addSvgIcon('issue', '/assets/icons/issue.svg');
    this.addSvgIcon('task', '/assets/icons/task.svg');
    this.addSvgIcon('subtask', '/assets/icons/subtask.svg');
    this.addSvgIcon('user_story', '/assets/icons/user_story.svg');

    this.addSvgIcon('priority_highest', '/assets/icons/priority_highest.svg');
    this.addSvgIcon('priority_high', '/assets/icons/priority_high.svg');
    this.addSvgIcon('priority_medium', '/assets/icons/priority_medium.svg');
    this.addSvgIcon('priority_low', '/assets/icons/priority_low.svg');
    this.addSvgIcon('priority_lowest', '/assets/icons/priority_lowest.svg');
  }

  private addSvgIcon(iconName: string, url: string) {
    this.matIconRegistry.addSvgIcon(
      iconName,
      this.domSanitizer.bypassSecurityTrustResourceUrl(window.location.origin + '/pl-PL' + url),
    );
  }
}
