import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { create } from '@storybook/theming';
import { ThemeProvider } from 'emotion-theming';
import styled from 'react-emotion';
import { theme, colors, injectStyles } from '../src';

injectStyles();

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.*.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const { STORYBOOK_OVERRIDE_BG } = process.env;
const StyledWrapper = styled.div`
  background-color: ${() => (STORYBOOK_OVERRIDE_BG ? '#92b900' : 'inherit')};
  padding: 30px;
`;

const ThemeDecorator = storyFn => (
  <ThemeProvider theme={theme}>
    <StyledWrapper>{storyFn()}</StyledWrapper>
  </ThemeProvider>
);

addDecorator(withInfo);

addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'Web-Toolkit',
      brandUrl: 'https://github.com/EurosportDigital/web-toolkit',
    }),
    showNav: true,
    showPanel: true,
    isFullscreen: false,
    hierarchySeparator: /\/|\./,
    hierarchyRootSeparator: /\|/,
    panelPosition: 'bottom',
    sidebarAnimations: true,
    isToolshown: true,
  },
});

addDecorator(ThemeDecorator);
addDecorator(withKnobs);

addParameters({
  backgrounds: [
    { name: 'default', value: colors.brandPlus2, default: true },
    { name: 'coreLightMinus1', value: colors.coreLightMinus1 },
  ],
});

configure(loadStories, module);
