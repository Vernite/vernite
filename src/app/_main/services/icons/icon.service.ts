import { Injectable, Inject, Optional } from '@angular/core';
import { Service } from '@main/decorators/service/service.decorator';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterExtensionsService } from '../router-extensions/router-extensions.service';
import { APP_BASE_HREF } from '@angular/common';

/**
 * Icon service - to register custom icons
 */
@Service()
@Injectable({
  providedIn: 'root',
})
export class IconService {
  /** Icons path */
  private iconsPath = '';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private routerExtensions: RouterExtensionsService,
    @Optional() @Inject(APP_BASE_HREF) private baseHref: string,
  ) {}

  /**
   * Init icon service by registering custom icons
   */
  init() {
    this.iconsPath = this.buildIconsPath();

    this.addSvgIcon('dashboard', 'assets/icons/dashboard.svg');

    this.addSvgIcon('epic', 'assets/icons/epic.svg');
    this.addSvgIcon('issue', 'assets/icons/issue.svg');
    this.addSvgIcon('task', 'assets/icons/task.svg');
    this.addSvgIcon('subtask', 'assets/icons/subtask.svg');
    this.addSvgIcon('user_story', 'assets/icons/user_story.svg');

    this.addSvgIcon('priority_highest', 'assets/icons/priority_highest.svg');
    this.addSvgIcon('priority_high', 'assets/icons/priority_high.svg');
    this.addSvgIcon('priority_medium', 'assets/icons/priority_medium.svg');
    this.addSvgIcon('priority_low', 'assets/icons/priority_low.svg');
    this.addSvgIcon('priority_lowest', 'assets/icons/priority_lowest.svg');
  }

  /**
   * Add svg icon to registry
   * @param iconName icon name to save in registry
   * @param url icon url
   */
  private addSvgIcon(iconName: string, url: string) {
    this.matIconRegistry.addSvgIcon(
      iconName,
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.iconsPath + url),
    );
  }

  /**
   * Build icons path from baseHref and language
   * @returns icons path
   */
  private buildIconsPath() {
    const baseHref = this.baseHref || '/';
    const language: string | null = this.routerExtensions.snapshot.language as string | null;

    let finalPath = window.location.origin + baseHref;

    if (language && !baseHref.includes(language)) {
      finalPath += language + '/';
    }

    return finalPath;
  }
}
