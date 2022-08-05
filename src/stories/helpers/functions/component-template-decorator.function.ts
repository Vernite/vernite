import { componentWrapperDecorator } from '@storybook/angular';
import { omit } from 'lodash-es';
import { Props } from '../classes/story.class';

export interface TemplateDecoratorConfig {
  selector: string;
  content?: string;
  wrapWithDiv?: boolean;
}

export function componentTemplateDecorator<C>(props: Props<C>, config: TemplateDecoratorConfig) {
  return componentWrapperDecorator((defTemplate: string) => {
    const content = props.content || '';
    const selector = config.selector;

    const defPropsString = extractPropsString(defTemplate);
    const newPropsString = buildPropsString(props);

    const propsString = combinePropsString(defPropsString, newPropsString);

    const template = buildTemplate(selector, content, propsString);

    if (config.wrapWithDiv) {
      return wrapWithDiv(template);
    } else {
      return template;
    }
  });
}

export function buildTemplate<C>(selector: string, content: string, propsString: string) {
  return `<${selector} ${propsString}>${content}</${selector}>`;
}

export function wrapWithDiv(template: string) {
  const style = 'display:flex;gap:1rem;';
  return `<div style="${style}">${template}</div>`;
}

export function buildPropsString<C>(props: Props<C>) {
  const filteredProps = omit(props, ['content']);

  return Object.entries(filteredProps)
    .map(([key, _]) => `[${key}]="${key}"`)
    .join(' ');
}

export function extractPropsString(template: string) {
  return template.match(/(?<=(<[A-Za-z-]* ))[^>]*(?=>)/g)?.[0] || '';
}

export function combinePropsString(...propsStrings: string[]) {
  return propsStrings.join(' ').trim().replace(/  +/g, ' ');
}
