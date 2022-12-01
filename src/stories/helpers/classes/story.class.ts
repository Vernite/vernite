import { FormControl } from '@ngneat/reactive-forms';
import { componentWrapperDecorator } from '@storybook/angular';
import { merge, omit } from 'lodash-es';
import { exposeAllPossibilities } from '../component-content-decorator.helper';
import { StoryPageConfig } from './story-page-config.class';
import { StoryTemplate } from './story-template.class';
import { StoryFn } from '@storybook/angular';
import {
  componentTemplateDecorator,
  wrapWithDiv,
} from '../functions/component-template-decorator.function';

export type Props<C> = Partial<C> & {
  formControl?: FormControl<any>;
  content?: string;
};

export interface StoryConfig<C> {
  config: StoryPageConfig;
  template: StoryTemplate<C>;
  description?: string;
  multiple?: {
    prop: string;
    options: any[];
  };
  props?: Props<C>;
  code?: string;
  html?: string;
}

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

  public mergeConfig(config: any) {
    merge(this._story, config);
  }

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

  public addProps(props: Props<C>) {
    this.mergeConfig({
      args: omit(props, ['content']),
    });
  }

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

  public get props() {
    return merge({}, this._config.props, this._config.template.props);
  }

  public story() {
    return this._story;
  }
}
