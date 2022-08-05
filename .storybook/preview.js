import { setCompodocJson } from "@storybook/addon-docs/angular";
import { themes } from '@storybook/theming';
import docJson from "../documentation.json";
setCompodocJson(docJson);

import '../src/styles/styles.scss';
import '@angular/localize/init';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
  darkMode: {
    dark: { ...themes.dark },
    light: { ...themes.normal }
  },
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'circlehollow',
      // Array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark'],
      // Property that specifies if the name of the item will be displayed
      showName: true,
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};
