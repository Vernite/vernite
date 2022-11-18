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

    return { params: node.value.params, data: node.value.data };
  }
}
