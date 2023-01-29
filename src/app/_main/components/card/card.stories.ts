import { CardComponent } from './card.component';
import { StoryPageConfig } from '../../../../stories/helpers/classes/story-page-config.class';
import { StoryTemplate } from '../../../../stories/helpers/classes/story-template.class';
import { Story } from 'src/stories/helpers/classes/story.class';

const config = new StoryPageConfig({
  title: 'Components/Card',
  component: CardComponent,
  selector: 'app-card',
});

const content = /*html*/ `
  <div class="card-title">Sample card</div>
  <div class="card-content">Little bit of content</div>
  <div class="card-content">
    <app-button>Action</app-button>
  </div>
`;

const template = new StoryTemplate({ content });

export default config.meta();
export const $Default = new Story({ template, config }).story();
