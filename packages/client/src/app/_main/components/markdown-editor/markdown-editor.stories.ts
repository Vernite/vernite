import { DOCS_SELECT, DOCS_READONLY } from '../../../../stories/helpers/arg-type.helper';
import { FormControl } from '@ngneat/reactive-forms';
import { MarkdownEditorComponent } from './markdown-editor.component';
import { FormControlStoryPageConfig } from 'src/stories/helpers/classes/form-control-story-page-config.class';
import { StoryTemplate } from 'src/stories/helpers/classes/story-template.class';
import { Story } from 'src/stories/helpers/classes/story.class';

const config = new FormControlStoryPageConfig({
  title: 'Components/Textarea',
  component: MarkdownEditorComponent,
  selector: 'markdown-editor',
  argTypes: {
    autocomplete: DOCS_SELECT,
    input: DOCS_READONLY,
    output: DOCS_READONLY,
  },
});

export default config.meta();

const formControl = new FormControl();
const template = new StoryTemplate({ formControl });

export const $Default = new Story({ config, template }).story();
