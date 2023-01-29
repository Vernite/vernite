/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MainModule } from '@main/_main.module';
import { TaskViewOptionsComponent } from './task-view-options.component';

describe('TaskViewOptionsComponent', () => {
  let component: TaskViewOptionsComponent;
  let fixture: ComponentFixture<TaskViewOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MainModule, RouterTestingModule],
      declarations: [TaskViewOptionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
