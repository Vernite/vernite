import { merge } from 'lodash-es';
import { Props } from './story.class';

export class StoryTemplate<C> {
  private _args: Props<C>;

  constructor(args: Props<C>) {
    const controlObject = args.formControl ? { formControl: args.formControl } : {};
    this._args = merge({}, controlObject, args);
  }

  public get props() {
    return this._args;
  }

  public template() {
    return ((args: C) => ({
      props: merge({}, args),
    })).bind({});
  }
}
