import { MarkdownEditorComponent } from './markdown-editor.component';
import { NgControl } from '@angular/forms';
import { Shallow } from 'shallow-render';
import { MainModule } from '../../_main.module';
import { TestNgControl } from '../../../../tests/helpers/ng-control-testing-provider.helper';

describe('TextareaComponent', () => {
  let shallow: Shallow<MarkdownEditorComponent>;

  beforeEach(() => {
    shallow = new Shallow(MarkdownEditorComponent, MainModule).provide({
      provide: NgControl,
      useClass: TestNgControl,
    });
  });

  it('should create', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeTruthy();
  });
});
