import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { SprintService } from '../services/sprint.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActiveSprintExistGuard implements CanActivate {
  constructor(private router: Router, private sprintService: SprintService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    const projectId = Number(route.paramMap.get('projectId'));

    return this.checkActiveSprintExist(projectId).pipe(
      map((isExist) => {
        if (isExist) {
          return this.redirectToSprint(projectId);
        } else {
          return this.redirectToBacklog(projectId);
        }
      }),
    );
  }

  private checkActiveSprintExist(projectId: number): Observable<boolean> {
    return this.sprintService.getActiveSprint(projectId).pipe(map((sprint) => Boolean(sprint)));
  }

  private redirectToBacklog(projectId: number): boolean {
    this.router.navigate(['/', 'projects', projectId, 'backlog']);
    return false;
  }

  private redirectToSprint(projectId: number): boolean {
    this.router.navigate(['/', 'projects', projectId, 'sprint']);
    return false;
  }
}
