import { componentWrapperDecorator } from '@storybook/angular';
import { omit } from 'lodash-es';
import { Props } from '../classes/story.class';

/** Config interface to use in component documentation */
export interface TemplateDecoratorConfig {
  /** Component selector */
  selector: string;
  /** Component content to inject using <ng-content> */
  content?: string;
  /** Wrap the component with a div */
  wrapWithDiv?: boolean;
}

/**
 * Decorator to change default component display in documentation - workaround to generate properly
 * @param props props to add to the component
 * @param config additional component config
 * @returns component template for documentation
 */
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

/**
 * Component template builder
 * @param selector Selector of the component
 * @param content Content of the component (<ng-content>)
 * @param propsString joined properties to use in the component
 * @returns component template string
 */
export function buildTemplate(selector: string, content: string, propsString: string) {
  return `<${selector} ${propsString}>${content}</${selector}>`;
}

/**
 * Wrap template with div element
 * @param template template to wrap with div
 * @returns template wrapped with div
 */
export function wrapWithDiv(template: string) {
  const style = 'display:flex;gap:1rem;';
  return `<div style="${style}">${template}</div>`;
}

/**
 * Props string builder
 * @param props props to add to the component
 * @returns props string to use in the component template builder
 */
export function buildPropsString<C>(props: Props<C>) {
  const filteredProps = omit(props, ['content']);

  return Object.entries(filteredProps)
    .map(([key, _]) => `[${key}]="${key}"`)
    .join(' ');
}

/**
 * Extract props string from template
 * @param template template string to extract props from
 * @returns props string
 */
export function extractPropsString(template: string) {
  return template.match(/(?<=(<[A-Za-z-]* ))[^>]*(?=>)/g)?.[0] || '';
}

/**
 * Combine props strings
 * @param propsStrings props strings to combine
 * @returns combined props string
 */
export function combinePropsString(...propsStrings: string[]) {
  return propsStrings.join(' ').trim().replace(/  +/g, ' ');
}
