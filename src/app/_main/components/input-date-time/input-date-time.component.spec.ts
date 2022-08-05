/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidationErrorPipe } from '@main/pipes/validation-error/validation-error.pipe';

import { InputDateTimeComponent } from './input-date-time.component';

describe('InputDateTimeComponent', () => {
  let component: InputDateTimeComponent;
  let fixture: ComponentFixture<InputDateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatNativeDateModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      declarations: [InputDateTimeComponent, ValidationErrorPipe],
      providers: [NgControl],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
