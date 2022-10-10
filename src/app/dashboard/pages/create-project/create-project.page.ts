import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddMemberDialog } from '@dashboard/dialogs/add-member/add-member.dialog';
import { Workspace } from '@dashboard/interfaces/workspace.interface';
import { MemberService } from '@dashboard/services/member/member.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from '@main/services/dialog/dialog.service';
import { maxLengthValidator } from '@main/validators/max-length.validator';
import { Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { requiredValidator } from 'src/app/_main/validators/required.validator';
import { ProjectService } from '../../services/project/project.service';
import { WorkspaceService } from '../../services/workspace/workspace.service';
import { Project } from '@dashboard/interfaces/project.interface';
import { IntegrationModulesGridComponent } from '@dashboard/components/integration-modules-grid/integration-modules-grid.component';
import { validateForm } from '@main/classes/form.class';
import { startLoader } from './../../../_main/operators/loader.operator';
import { setLoaderMessage } from '@main/operators/loader.operator';
import { Loader } from '@main/classes/loader/loader.class';
import { notEmptyValidator } from '@main/validators/not-empty.validator';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.page.html',
  styleUrls: ['./create-project.page.scss'],
})
export class CreateProjectPage {
  @ViewChild(IntegrationModulesGridComponent)
  integrationModulesGrid!: IntegrationModulesGridComponent;

  /**
   * Form group for the project creation.
   */
  public form = new FormGroup({
    name: new FormControl<string>('', [
      requiredValidator(),
      maxLengthValidator(50),
      notEmptyValidator(),
    ]),
    workspaceId: new FormControl<number>(0, [requiredValidator()]),
  });

  faPlus = faPlus;
  /**
   * Subscription to the workspace creation.
   */
  public createSubscription?: Subscription;

  public workspace$!: Observable<Workspace>;

  public workspaceId!: number;

  public memberList: string[] = [];

  public project?: Project;

  public loader = new Loader();

  /**
   * Default constructor. Injects the Workspace and Router service.
   * @param workspaceService Workspace service
   * @param router Router service
   */
  constructor(
    private workspaceService: WorkspaceService,
    private projectService: ProjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private memberService: MemberService,
  ) {
    const { workspaceId } = this.activatedRoute.snapshot.params;
    this.workspaceId = workspaceId;
    this.workspace$ = this.workspaceService.get(workspaceId);
    this.form.get('workspaceId').setValue(workspaceId);
  }

  openAddMembersDialog() {
    this.dialogService
      .open(AddMemberDialog, {})
      .afterClosed()
      .subscribe((result) => {
        this.memberList = [...this.memberList, ...result];
      });
  }

  /**
   * Creates a new workspace. Passes the form data to the workspace service. Then navigates to the workspace list if form was valid.
   * Otherwise, displays an error message.
   */
  public submitCreate(): void {
    if (!this.createSubscription?.closed && this.createSubscription) return;
    if (!validateForm(this.form)) return;

    of(null)
      .pipe(
        startLoader(this.loader),
        switchMap(() => this.projectService.create(this.form.value)),
        tap((project) => (this.project = project)),
        setLoaderMessage(this.loader, $localize`Saving project members...`),
        switchMap((project) => this.memberService.add(this.memberList, [project.id])),
        setLoaderMessage(this.loader, $localize`Saving integrations...`),
        switchMap(() => this.integrationModulesGrid.saveAll()),
      )
      .subscribe((project) => {
        this.router.navigate(['/', this.workspaceId, project.id]);
      });
  }
}
