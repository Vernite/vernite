import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Router extensions service (to improve router snapshot)
 */
@Injectable({
  providedIn: 'root',
})
export class RouterExtensionsService {
  constructor(private router: Router) {}

  /**
   * Get router snapshot
   */
  public get snapshot() {
    if (!this.router.routerState) return { params: {}, data: {} };

    let node = (this.router.routerState.snapshot as any)._root;
    while (node.children[0]) {
      node = node.children[0];
    }

    return {
      params: node.value.params,
      data: node.value.data,
      language: this.getLanguageFromUrl(),
      baseHref: this.getBaseHref(),
    };
  }

  /**
   * Get language from url
   * @returns language from url
   */
  private getLanguageFromUrl() {
    const languagePredicate = location.pathname.split('/')[1];

    if (!languagePredicate) return null;
    if (/^.{2}-.{2}$/.test(languagePredicate)) {
      return languagePredicate!;
    } else {
      return null;
    }
  }

  /**
   * Get base href
   * @returns base href
   */
  private getBaseHref() {
    return document.getElementsByTagName('base')[0].href;
  }
}
