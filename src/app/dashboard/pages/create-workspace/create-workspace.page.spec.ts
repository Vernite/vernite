/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreateWorkspacePage } from './create-workspace.page';

describe('CreateWorkspaceComponent', () => {
  let component: CreateWorkspacePage;
  let fixture: ComponentFixture<CreateWorkspacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateWorkspacePage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkspacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
