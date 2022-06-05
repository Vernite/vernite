import { MainModule } from '@main/_main.module';
import { Shallow } from 'shallow-render';
import { IconComponent } from './icon.component';

describe(IconComponent.name, () => {
  let shallow: Shallow<IconComponent>;

  beforeEach(() => {
    shallow = new Shallow(IconComponent, MainModule);
  });

  it('should create', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeTruthy();
  });
});
