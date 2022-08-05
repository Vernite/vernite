import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputDateTimeComponent } from './input-date-time.component';
import {
  DOCS_SELECT,
  DOCS_PRESET_CONTROL_ACCESSOR,
} from '../../../../stories/helpers/arg-type.helper';
import { MainModule } from '@main/_main.module';
import { FormControl, NgControl } from '@angular/forms';
import { story } from './../../../../stories/helpers/story.helper';
import { Story, moduleMetadata, Meta } from '@storybook/angular';

export default {
  title: 'Components/InputDateTime',
  component: InputDateTimeComponent,
  decorators: [
    moduleMetadata({
      imports: [MainModule, BrowserAnimationsModule],
      providers: [NgControl],
    }),
  ],
  argTypes: {
    ...DOCS_PRESET_CONTROL_ACCESSOR,
    autocomplete: DOCS_SELECT,
  },
} as Meta;

const Template: Story<InputDateTimeComponent> = (args: InputDateTimeComponent) => ({
  props: args,
});

export const $Default = story(Template.bind({}), {
  selector: 'app-input-date-time',
  template: `<app-input-date-time></app-input-date-time>`,
  props: {
    formControl: new FormControl(),
  },
});
