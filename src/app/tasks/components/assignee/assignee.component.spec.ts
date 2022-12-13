import { TasksModule } from '@tasks/tasks.module';
import { Shallow } from 'shallow-render';

import { AssigneeComponent } from './assignee.component';

describe('AssigneeComponent', () => {
  let shallow: Shallow<AssigneeComponent>;

  beforeEach(() => {
    shallow = new Shallow(AssigneeComponent, TasksModule);
  });

  it('should create', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeTruthy();
  });
});
