import { FormControl } from '@ngneat/reactive-forms';
import { componentWrapperDecorator, StoryFn } from '@storybook/angular';
import { merge, omit } from 'lodash-es';
import { exposeAllPossibilities } from '../component-content-decorator.helper';
import { StoryPageConfig } from './story-page-config.class';
import { StoryTemplate } from './story-template.class';
import {
  componentTemplateDecorator,
  wrapWithDiv,
} from '../functions/component-template-decorator.function';

/** Components props type */
export type Props<C> = Partial<C> & {
  /**
   * Form control to use in the component
   */
  formControl?: FormControl<any>;
  /**
   * Content to use in the component (injected as <ng-content>)
   */
  content?: string;
};

/** Component docs story configuration interface */
export interface StoryConfig<C> {
  /** Story page configuration */
  config: StoryPageConfig;
  /** Story template */
  template: StoryTemplate<C>;
  /** Story description */
  description?: string;
  /** Story multiple props */
  multiple?: {
    /** prop name */
    prop: string;
    /** prop options */
    options: any[];
  };
  /** Custom props to add to component */
  props?: Props<C>;
  /** Custom code snippet */
  code?: string;
  /** Custom template */
  html?: string;
}

/** Component documentation story */
export class Story<C> {
  private _config: StoryConfig<C>;
  private _story: StoryFn<C>;

  constructor(config: StoryConfig<C>) {
    this._config = config;
    this._story = config.template.template();

    if (config.multiple) {
      exposeAllPossibilities(
        this._story,
        config.config.selector,
        config.multiple.prop,
        config.multiple.options,
      );
    }

    if (config.description) {
      this.addDescription(config.description);
    }

    if (config.code) {
      this.addCode(config.code);
    }

    if (config.html) {
      this.addTemplate(config.html);
    } else if (!config.multiple) {
      this.addDefaultTemplate();
    }

    if (this.props) {
      this.addProps(this.props);
    }
  }

  /** Merge custom story config to default config */
  public mergeConfig(config: any) {
    merge(this._story, config);
  }

  /** Add description to story */
  public addDescription(description: string) {
    this.mergeConfig({
      parameters: {
        docs: {
          description: {
            story: description,
          },
        },
      },
    });
  }

  /** Add custom component props to story */
  public addProps(props: Props<C>) {
    this.mergeConfig({
      args: omit(props, ['content']),
    });
  }

  /** Add custom code snippet to component story */
  public addCode(code: string) {
    this.mergeConfig({
      parameters: {
        docs: {
          source: {
            code: code,
            language: 'html',
            type: 'auto',
          },
        },
      },
    });
  }

  /** Add custom component template */
  public addTemplate(template: string) {
    this.mergeConfig({
      decorators: [componentWrapperDecorator(() => wrapWithDiv(template))],
      parameters: {
        docs: {
          source: {
            code: template,
            language: 'html',
            type: 'auto',
          },
        },
      },
    });
  }

  /** Configure default template string */
  public addDefaultTemplate() {
    this.mergeConfig({
      decorators: [
        componentTemplateDecorator(this.props, {
          selector: this._config.config.selector,
          wrapWithDiv: true,
        }),
      ],
    });
  }

  /** Get component props */
  public get props() {
    return merge({}, this._config.props, this._config.template.props);
  }

  /** Get story (used in storybook) */
  public story() {
    return this._story;
  }
}
