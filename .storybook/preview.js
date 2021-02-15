import React from 'react';
import { setOptions } from "@storybook/addon-options";
import { defaultTheme } from '../src/defaultTheme'
import { ThemeProvider } from 'styled-components';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const ThemeDecorator = (Story) => (
  <ThemeProvider theme={defaultTheme}>
    <div width="100%" height="100%">
      <Story />
    </div>
  </ThemeProvider>
);

// .storybook/preview.js

setOptions({
  name: 'Gatsby Frontend',
  downPanelInRight: true
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
    },
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Tokens', 'Layout', 'Atoms', 'Molecules', 'Organisms'],
    },
  }
}

export const decorators = [ThemeDecorator]