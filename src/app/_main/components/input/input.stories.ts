import { InputComponent } from './input.component';
import { DOCS_SELECT } from '../../../../stories/helpers/arg-type.helper';
import { FormControl } from '@ngneat/reactive-forms';
import { FormControlStoryPageConfig } from 'src/stories/helpers/classes/form-control-story-page-config.class';
import { StoryTemplate } from 'src/stories/helpers/classes/story-template.class';
import { Story } from 'src/stories/helpers/classes/story.class';

const config = new FormControlStoryPageConfig({
  title: 'Components/Input',
  component: InputComponent,
  selector: 'app-input',
  argTypes: {
    autocomplete: DOCS_SELECT,
    type: DOCS_SELECT,
  },
});

const formControl = new FormControl();

const template = new StoryTemplate<InputComponent>({ formControl });

export default config.meta();
export const $Default = new Story({ template, config }).story();
export const FloatingLabel = new Story({
  template,
  config,
  props: {
    floatingLabel: 'Sample field',
  },
  description: `Best way to describe field purpose is to add a \`floatingLabel\`. The floating label will
    be shown above the field if field is in focus state or when the input contains some value.`,
}).story();

export const StaticLabel = new Story({
  template,
  config,
  props: {
    staticLabel: 'Sample field',
  },
  description: `This is the other way to show the user purpose of this field. Static label will be always displayed
    above the input field regardless of state and content`,
}).story();

export const Hint = new Story({
  template,
  config,
  props: {
    hint: 'Sample hint',
  },
  description: `...`,
}).story();

export const Placeholder = new Story({
  template,
  config,
  props: {
    placeholder: 'Sample placeholder',
  },
  description: `...`,
}).story();
