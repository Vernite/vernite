/* tslint:disable:no-unused-variable */
import { MainModule } from '@main/_main.module';
import { Shallow } from 'shallow-render';

import { InputDateTimeComponent } from './input-date-time.component';
import { NgControl } from '@angular/forms';
import { TestNgControl } from '../../../../tests/helpers/ng-control-testing-provider.helper';

describe('InputDateTimeComponent', () => {
  let shallow: Shallow<InputDateTimeComponent>;

  beforeEach(() => {
    shallow = new Shallow(InputDateTimeComponent, MainModule).provide({
      provide: NgControl,
      useClass: TestNgControl,
    });
  });

  it('should create', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeTruthy();
  });
});
