/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MainModule } from '@main/_main.module';

import { CreateProjectMembersPage } from './create-project-members.page';

describe(CreateProjectMembersPage.name, () => {
  let component: CreateProjectMembersPage;
  let fixture: ComponentFixture<CreateProjectMembersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MainModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      declarations: [CreateProjectMembersPage],
      providers: [NgControl],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectMembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
