import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MainModule } from '@main/_main.module';
import { Shallow } from 'shallow-render';
import { ButtonComponent } from './button.component';

describe(ButtonComponent.name, () => {
  let shallow: Shallow<ButtonComponent>;

  beforeEach(() => {
    shallow = new Shallow(ButtonComponent, MainModule).import(MatProgressSpinnerModule);
  });

  it('should create', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeTruthy();
  });

  it('should have passed text', async () => {
    const { find } = await shallow.render('<app-button>Hello world!</app-button>');
    expect(find('button').nativeElement.textContent).toBe('Hello world!');
  });

  it('should be able to focus', async () => {
    const { find, instance } = await shallow.render(
      /*html*/ `<app-button>Hello world!</app-button>`,
    );
    instance.focus();
    await new Promise((resolve, reject) => setTimeout(resolve, 200));
    expect(document.activeElement === find('button').nativeElement).toBe(true);
  });
});
