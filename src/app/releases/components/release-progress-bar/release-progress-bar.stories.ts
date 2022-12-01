import { StoryPageConfig } from 'src/stories/helpers/classes/story-page-config.class';
import { StoryTemplate } from 'src/stories/helpers/classes/story-template.class';
import { Story } from 'src/stories/helpers/classes/story.class';
import { ReleaseProgressBarComponent } from './release-progress-bar.component';

const config = new StoryPageConfig({
  title: 'Components/Releases/ReleaseProgressBar',
  component: ReleaseProgressBarComponent,
  selector: 'release-progress-bar',
});

const template = new StoryTemplate<ReleaseProgressBarComponent>({});

export default config.meta();
export const $Default = new Story({
  template,
  config,
}).story();
