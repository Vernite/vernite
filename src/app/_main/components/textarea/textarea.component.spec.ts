import { TextareaComponent } from './textarea.component';
import { NgControl } from '@angular/forms';
import { Shallow } from 'shallow-render';
import { MainModule } from '../../_main.module';
import { TestNgControl } from '../../../../tests/helpers/ng-control-testing-provider.helper';

describe('TextareaComponent', () => {
  let shallow: Shallow<TextareaComponent>;

  beforeEach(() => {
    shallow = new Shallow(TextareaComponent, MainModule).provide({
      provide: NgControl,
      useClass: TestNgControl,
    });
  });

  it('should create', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeTruthy();
  });
});
