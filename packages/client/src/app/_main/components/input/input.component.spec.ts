/* tslint:disable:no-unused-variable */

import { InputComponent } from './input.component';
import { NgControl } from '@angular/forms';
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
