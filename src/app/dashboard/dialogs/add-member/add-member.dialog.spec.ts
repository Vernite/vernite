/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskPriorityIconPipe } from '@tasks/pipes/task-priority-icon.pipe';
import { TaskPriorityPipe } from '@tasks/pipes/task-priority.pipe';
import { TaskTypeIconPipe } from '@tasks/pipes/task-type-icon.pipe';
import { TaskTypePipe } from '@tasks/pipes/task-type.pipe';
import { MainModule } from '../../../_main/_main.module';
import { AddMemberDialog } from './add-member.dialog';

describe('AddMemberDialog', () => {
  let component: AddMemberDialog;
  let fixture: ComponentFixture<AddMemberDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MainModule, BrowserAnimationsModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [
        AddMemberDialog,
        TaskPriorityPipe,
        TaskPriorityIconPipe,
        TaskTypePipe,
        TaskTypeIconPipe,
      ],
      providers: [
        MatDialogModule,
        NgControl,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
