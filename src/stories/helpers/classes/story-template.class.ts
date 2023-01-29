import { merge } from 'lodash-es';
import { Props } from './story.class';

/** Template class to create storybook templates */
export class StoryTemplate<C> {
  private _args: Props<C>;

  constructor(args: Props<C>) {
    const controlObject = args.formControl ? { formControl: args.formControl } : {};
    this._args = merge({}, controlObject, args);
  }

  /** Get template props */
  public get props() {
    return this._args;
  }

  /** Get template function */
  public template() {
    return ((args: C) => ({
      props: merge({}, args),
    })).bind({});
  }
}
