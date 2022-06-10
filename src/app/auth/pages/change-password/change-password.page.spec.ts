/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangePasswordPage } from './change-password.page';
import { RouterTestingModule } from '@angular/router/testing';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { MainModule } from '@main/_main.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ChangePasswordPage', () => {
  let component: ChangePasswordPage;
  let fixture: ComponentFixture<ChangePasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MainModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [ChangePasswordPage],
      providers: [NgControl],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
