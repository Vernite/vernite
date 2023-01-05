import { TestBed } from '@angular/core/testing';
import { TaskService } from '@tasks/services/task/task.service';
import { TaskPipe } from './task.pipe';

describe('TaskPipe', () => {
  let pipe: TaskPipe;

  beforeEach(() => {
    const taskServiceStub = () => ({ get: (projectId: any, taskId: any) => ({}) });
    TestBed.configureTestingModule({
      providers: [TaskPipe, { provide: TaskService, useFactory: taskServiceStub }],
    });
    pipe = TestBed.inject(TaskPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms X to Y', () => {
    const value: any = 'X';
    const args: any[] = [];
    expect(pipe.transform(value, args)).toEqual('Y');
  });
});
