/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MainModule } from '../../../_main/_main.module';
import { TaskDialog } from './task.dialog';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskPriorityPipe } from '@tasks/pipes/task-priority.pipe';
import { TaskPriorityIconPipe } from '@tasks/pipes/task-priority-icon.pipe';
import { TaskTypePipe } from '@tasks/pipes/task-type.pipe';
import { TaskTypeIconPipe } from '@tasks/pipes/task-type-icon.pipe';

describe('TaskDialog', () => {
  let component: TaskDialog;
  let fixture: ComponentFixture<TaskDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MainModule, BrowserAnimationsModule, ReactiveFormsModule],
      declarations: [
        TaskDialog,
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
    fixture = TestBed.createComponent(TaskDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
