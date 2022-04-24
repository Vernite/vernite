/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProjectsListPage } from './projects-list.page';
import { MainModule } from 'src/app/_main/_main.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProjectsListComponent', () => {
  let component: ProjectsListPage;
  let fixture: ComponentFixture<ProjectsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MainModule, RouterTestingModule],
      declarations: [ProjectsListPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
