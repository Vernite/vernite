import { ArgTypes, componentWrapperDecorator, Story } from '@storybook/angular';
import { wrapWithDiv } from './functions/component-template-decorator.function';

const setContent = (template: string, content: string) => {
  return template.replace(/(?<=(<[^/]*))>.?<(?=\/)/g, `>${content}<`);
};

export const componentContentDecorator = (content: string) => {
  return componentWrapperDecorator((story) => {
    return setContent(story, content);
  });
};

export const exposeAllPossibilities = <C = any>(
  story: Story<C>,
  selector: string,
  input: string,
  values: string[],
) => {
  const inputRegex = new RegExp(`( |)\\[${input}\\]="${input}"`, 'g');

  const addInputToTemplate = (template: string, value: string) => {
    let valueCapital = value[0].toUpperCase() + value.substring(1);
    return template.replace('><', ` ${input}="${value}">${valueCapital}<`);
  };

  story.decorators = [
    componentWrapperDecorator((story) => {
      const baseTemplate = story.replace(inputRegex, '');
      const inputsArray = values.map((v) => addInputToTemplate(baseTemplate, v));
      const template = inputsArray.join('');

      return wrapWithDiv(template);
    }),
  ];

  story.argTypes = {
    [input]: {
      table: {
        disable: true,
      },
    },
  } as any as Partial<ArgTypes<C>>;

  const emptyTemplate = `<${selector}></${selector}>`;
  const snippet = values.map((v) => addInputToTemplate(emptyTemplate, v)).join('\n');

  story.parameters = {
    docs: {
      source: {
        code: snippet,
        language: 'html',
        type: 'auto',
      },
    },
  };

  return story;
};
