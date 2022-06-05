import { faQuestion } from '@fortawesome/free-solid-svg-icons';
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

  it('Should have defined size', async () => {
    const { element, find } = await shallow.render({
      bind: { size: '2rem' },
    });
    expect(getComputedStyle(find('fa-icon').nativeElement).fontSize).toBe('32px');
  });

  it("Should return it's proper snakeCase name", async () => {
    const { instance } = await shallow.render();
    expect(instance.snakeCaseName).toBe('question');
  });

  it('Icon getter should work [mat-icon]', async () => {
    const { instance } = await shallow.render({ bind: { icon: 'matQuestion' } });
    expect(instance.icon).toBe('matQuestion');
  });

  it('Icon getter should work [font-awesome]', async () => {
    const { instance } = await shallow.render({ bind: { icon: faQuestion } });
    expect(instance.icon).toBe(faQuestion);
  });
});
