/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgControl } from '@angular/forms';

import { InputDateTimeComponent } from './input-date-time.component';

describe('InputDateTimeComponent', () => {
  let component: InputDateTimeComponent;
  let fixture: ComponentFixture<InputDateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputDateTimeComponent],
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
