import { MainModule } from '@main/_main.module';
import { story } from './../../../../stories/helpers/story.helper';
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { CardComponent } from './card.component';

export default {
  title: 'Components/Card',
  component: CardComponent,
  decorators: [
    // componentContentDecorator(`
    //   <div class="card-title">
    //     Sample card
    //   </div>
    //   <div class="card-content">
    //     Little bit of content
    //   </div>
    // `),
    // componentWrapperDecorator(CardComponent),
    moduleMetadata({
      imports: [MainModule],
    }),
  ],
} as Meta;

const Template: Story<CardComponent> = (args: CardComponent) => ({
  props: args,
});

export const $Default = story(Template.bind({}), {
  selector: 'app-card',
  template: `
    <app-card>
      <div class="card-title">
        Sample card
      </div>
      <div class="card-content">
        Little bit of content
      </div>
    </app-card>
  `,
});

export const Actions = story(Template.bind({}), {
  selector: 'app-card',
  description: `Cards also have an actions section where buttons can be placed`,
  template: `
    <app-card>
      <div class="card-title">
        Sample card
      </div>
      <div class="card-content">
        Little bit of content
      </div>
      <div class="card-content">
        <app-button>Action</app-button>
      </div>
    </app-card>
  `,
});
