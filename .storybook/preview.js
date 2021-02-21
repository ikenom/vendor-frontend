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

// Gatsby Setup
// ============================================
// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = '';
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action('NavigateTo:')(pathname);
};


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
      order: ['Tokens', 'Layout', 'Icons', 'Atoms', 'Molecules', 'Organisms'],
    },
  }
}

export const decorators = [ThemeDecorator]