/* tslint:disable:no-unused-variable */
import { TasksModule } from '@tasks/tasks.module';
import { Shallow } from 'shallow-render';

import { InputAssigneeComponent } from './input-assignee.component';

describe(InputAssigneeComponent.name, () => {
  let shallow: Shallow<InputAssigneeComponent>;

  beforeEach(() => {
    shallow = new Shallow(InputAssigneeComponent, TasksModule);
  });

  it('should create', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeTruthy();
  });
});
