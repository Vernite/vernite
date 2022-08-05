import { DOCS_SELECT } from '../../../../stories/helpers/arg-type.helper';
import { FormControl } from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';
import { FormControlStoryPageConfig } from 'src/stories/helpers/classes/form-control-story-page-config.class';
import { StoryTemplate } from 'src/stories/helpers/classes/story-template.class';
import { Story } from 'src/stories/helpers/classes/story.class';

const config = new FormControlStoryPageConfig({
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  selector: 'app-checkbox',
  argTypes: {
    autocomplete: DOCS_SELECT,
  },
});

const formControl = new FormControl();
const content = 'Sample checkbox';

const template = new StoryTemplate({ formControl, content });

export default config.meta();
export const $Default = new Story({ template, config }).story();
