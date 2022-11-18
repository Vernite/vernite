/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { ValidationErrorPipe } from '../../pipes/validation-error/validation-error.pipe';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Shallow } from 'shallow-render';
import { MainModule } from '@main/_main.module';
import { TestNgControl } from '@tests/helpers/ng-control-testing-provider.helper';

describe('InputComponent', () => {
  let shallow: Shallow<InputComponent>;

  beforeEach(() => {
    shallow = new Shallow(InputComponent, MainModule).provide({
      provide: NgControl,
      useClass: TestNgControl,
    });
  });

  it('should create', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeTruthy();
  });
});
