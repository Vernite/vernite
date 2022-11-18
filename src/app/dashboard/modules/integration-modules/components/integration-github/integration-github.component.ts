import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { GitRepository } from '@dashboard/interfaces/git-integration.interface';
import { GitIntegrationService } from '@dashboard/services/git-integration/git-integration.service';
import { requiredValidator } from '@main/validators/required.validator';
import { IntegrationModule } from '../../decorators/integration-module/integration-module.decorator';
import { IntegrationComponent } from '../../interfaces/integration-component.interface';
import { Project } from '@dashboard/interfaces/project.interface';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faLock } from '@fortawesome/free-solid-svg-icons';
import { map, of, switchMap } from 'rxjs';
import { Loader } from '@main/classes/loader/loader.class';
import { startLoader, stopLoader } from './../../../../../_main/operators/loader.operator';

@IntegrationModule({
  title: 'GitHub',
  description: 'Create GitHub issues simultaneously, connect pull requests with tasks.',
  icon: faGithub,
  isAttached(project: Project): boolean {
    return Boolean(project.gitHubIntegration);
  },
  detach(project: Project, injector: Injector) {
    const gitIntegrationService = injector.get(GitIntegrationService);

    return gitIntegrationService.deleteGitHubIntegration(project.id).pipe(map(() => true));
  },
})
@Component({
  selector: 'app-integration-github',
  templateUrl: './integration-github.component.html',
  styleUrls: ['./integration-github.component.scss'],
})
export class IntegrationGitHubComponent implements OnInit, IntegrationComponent {
  @Input() project?: Project;

  repositories: GitRepository[] = [];

  public faGlobe = faGlobe;
  public faLock = faLock;

  public loader = new Loader();

  constructor(private gitIntegrationService: GitIntegrationService) {}

  public form = new FormGroup({
    repository: new FormControl<string>(undefined, [requiredValidator()]),
  });

  connectToGithub() {
    this.gitIntegrationService.startGitHubIntegration().subscribe(() => {
      this.loadRepositories();
    });
  }

  loadRepositories() {
    of(null)
      .pipe(
        startLoader(this.loader),
        switchMap(() => this.gitIntegrationService.getGitHubIntegration()),
        stopLoader(this.loader),
      )
      .subscribe((integration) => {
        this.repositories = integration.gitRepositories;
      });
  }

  save() {
    // Check if the form is valid and project was passed to the component
    if (!this.form.value.repository || !this.project) return of(null);

    // Check if something was changed
    if (this.project.gitHubIntegration === this.form.value.repository) return of(null);

    if (this.project.gitHubIntegration) {
      // Detach integration if project already has an integration and add new one
      return this.gitIntegrationService.deleteGitHubIntegration(this.project.id).pipe(
        switchMap(() => {
          return this.gitIntegrationService.attachGitHubIntegration(
            this.project!.id,
            this.form.value.repository,
          );
        }),
      );
    } else {
      // Attach integration if project doesn't have an integration
      return this.gitIntegrationService.attachGitHubIntegration(
        this.project.id,
        this.form.value.repository,
      );
    }
  }

  ngOnInit() {
    this.loadRepositories();

    if (this.project) {
      this.form.get('repository').setValue(this.project.gitHubIntegration);
    }
  }
}
