/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkspacePage } from './edit-workspace.page';
import { RouterTestingModule } from '@angular/router/testing';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from '@main/_main.module';

describe('EditWorkspacePage', () => {
  let component: EditWorkspacePage;
  let fixture: ComponentFixture<EditWorkspacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MainModule, RouterTestingModule, BrowserAnimationsModule, ReactiveFormsModule],
      declarations: [EditWorkspacePage],
      providers: [NgControl],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkspacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
