/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspacesListPage } from './workspaces-list.page';
import { RouterTestingModule } from '@angular/router/testing';
import { MainModule } from '@main/_main.module';

describe('WorkspacesListPage', () => {
  let component: WorkspacesListPage;
  let fixture: ComponentFixture<WorkspacesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MainModule, RouterTestingModule],
      declarations: [WorkspacesListPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspacesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
