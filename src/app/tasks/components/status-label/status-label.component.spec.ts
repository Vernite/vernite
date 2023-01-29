/* tslint:disable:no-unused-variable */

import { TasksModule } from '@tasks/tasks.module';
import { Shallow } from 'shallow-render';
import { StatusLabelComponent } from './status-label.component';

describe(StatusLabelComponent.name, () => {
  let shallow: Shallow<StatusLabelComponent>;

  beforeEach(() => {
    shallow = new Shallow(StatusLabelComponent, TasksModule);
  });

  it('should create', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeTruthy();
  });
});
