// /* tslint:disable:no-unused-variable */
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { NgControl, ReactiveFormsModule } from '@angular/forms';
// import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterTestingModule } from '@angular/router/testing';
// import { InputEpicComponent } from '@tasks/components/input-epic/input-epic.component';
// import { TaskPriorityIconPipe } from '@tasks/pipes/task-priority-icon.pipe';
// import { TaskPriorityPipe } from '@tasks/pipes/task-priority.pipe';
// import { TaskTypeIconPipe } from '@tasks/pipes/task-type-icon.pipe';
// import { TaskTypePipe } from '@tasks/pipes/task-type.pipe';
// import { TasksModule } from '@tasks/tasks.module';
// import { MatDialogTestingProvider } from '@tests/helpers/mat-dialog-testing-provider.helper';
// import { Shallow } from 'shallow-render';
// import { MainModule } from '../../../_main/_main.module';
// import { TaskDialog } from './task.dialog';
// import { RouterModule } from '@angular/router';
// import { ApiService } from '@main/services/api/api.service';

// describe('TaskDialog', () => {
//   let shallow: Shallow<TaskDialog>;

//   beforeEach(() => {
//     shallow = new Shallow(TaskDialog, TasksModule)
//       .provide(...MatDialogTestingProvider, ApiService)
//       .import(RouterModule.forRoot([]));
//   });

//   it('should create', async () => {
//     const { instance } = await shallow.render();
//     expect(instance).toBeTruthy();
//   });
// });
