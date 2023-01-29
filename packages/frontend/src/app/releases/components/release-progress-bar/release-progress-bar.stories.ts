import { StoryPageConfig } from 'src/stories/helpers/classes/story-page-config.class';
import { StoryTemplate } from 'src/stories/helpers/classes/story-template.class';
import { Story } from 'src/stories/helpers/classes/story.class';
import { ReleaseProgressBarComponent } from './release-progress-bar.component';

/** Release progress bar component story */
const config = new StoryPageConfig({
  title: 'Components/Releases/ReleaseProgressBar',
  component: ReleaseProgressBarComponent,
  selector: 'release-progress-bar',
});

/** Release progress bar component story template */
const template = new StoryTemplate<ReleaseProgressBarComponent>({});

/** Release progress bar component story meta */
export default config.meta();

/** Release progress bar default component story */
export const $Default = new Story({
  template,
  config,
}).story();
