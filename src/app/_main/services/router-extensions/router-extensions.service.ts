import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterExtensionsService {
  constructor(private router: Router) {}

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

  private getLanguageFromUrl() {
    const languagePredicate = location.pathname.split('/')[1];

    if (!languagePredicate) return null;
    if (/^.{2}-.{2}$/.test(languagePredicate)) {
      return languagePredicate!;
    } else {
      return null;
    }
  }

  private getBaseHref() {
    console.log(document.getElementsByTagName('base')[0]);
    return document.getElementsByTagName('base')[0].href;
  }
}
