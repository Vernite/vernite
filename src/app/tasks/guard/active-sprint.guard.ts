import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { RouterExtensionsService } from '@main/services/router-extensions/router-extensions.service';
import { SprintService } from '@tasks/services/sprint.service';
import { map, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActiveSprintGuard implements CanActivate {
  constructor(
    private router: Router,
    private sprintService: SprintService,
    private activatedRoute: ActivatedRoute,
    private routerExtensions: RouterExtensionsService,
  ) {}

  canActivate() {
    return this.activatedRoute.params.pipe(
      switchMap(({ projectId, sprintId }) => {
        // TEST TEST TEST zwraca undefined - do poprawy
        console.log(projectId, sprintId);
        if (sprintId === 'active') {
          return this.sprintService.getActiveSprint(projectId).pipe(
            map((activeSprint) => {
              this.router.navigateByUrl(
                this.router.url.replace('active', activeSprint?.id.toString() || 'active'),
              );
              return false;
            }),
          );
        } else {
          return of(true);
        }
      }),
    );
  }
}
