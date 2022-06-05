import { NgControl } from '@angular/forms';
import { MainModule } from '@main/_main.module';
import { Shallow } from 'shallow-render';
import { TestNgControl } from '../../../../tests/helpers/ng-control-testing-provider.helper';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let shallow: Shallow<CheckboxComponent>;

  beforeEach(async () => {
    shallow = new Shallow(CheckboxComponent, MainModule).provide({
      provide: NgControl,
      useClass: TestNgControl,
    });
  });

  it('should create', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeTruthy();
  });
});
