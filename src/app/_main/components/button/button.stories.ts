import { DOCS_READONLY, DOCS_SELECT } from '../../../../stories/helpers/arg-type.helper';
import { ButtonComponent } from './button.component';
import { DOCS_ICON_SELECT } from 'src/stories/helpers/arg-type.helper';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { StoryPageConfig } from 'src/stories/helpers/classes/story-page-config.class';
import { StoryTemplate } from 'src/stories/helpers/classes/story-template.class';
import { Story } from 'src/stories/helpers/classes/story.class';

const config = new StoryPageConfig({
  title: 'Components/Button',
  component: ButtonComponent,
  selector: 'app-button',
  argTypes: {
    variant: DOCS_SELECT,
    type: DOCS_SELECT,
    icon: DOCS_ICON_SELECT,
    elementRef: DOCS_READONLY,
  },
});

export default config.meta();

const template = new StoryTemplate<ButtonComponent>({ content: 'Button' });

export const $Default = new Story({ template, config }).story();
export const Variant = new Story({
  template,
  config,
  multiple: {
    prop: 'variant',
    options: ['primary', 'secondary', 'important'],
  },
  description: `To customize the general appearance you need to use the \`variant\` property with one of the specified values.
    If you will not specify variant, the button will appear with \`secondary\` styling.`,
}).story();

export const Pending = new Story({
  template,
  config,
  description: `To make the button show with loader you need to pass \`pending\` property with value: \`true\`.`,
  code: `<app-button [pending]="true">Button</app-button>`,
  props: {
    pending: true,
  },
}).story();

export const Type = new Story({
  template,
  config,
  code: `<app-button type="button"></app-button>`,
  description: `If button is nested in a form, the default behavior is making this button a \`submit\` button. To
  omit this it is needed to set \`type\` to \`button\`.`,
  props: {
    type: 'button',
  },
}).story();

export const Icon = new Story({
  template,
  config,
  code: `<app-button [icon]="faAdd"></app-button>`,
  description: `You can set \`icon\` property to add icon before text in buttons. This option supports prefixes like: \`mat\` |
  \`fas\` | \`fab\` | \`cu\`.`,
  props: {
    icon: faAdd,
  },
}).story();
