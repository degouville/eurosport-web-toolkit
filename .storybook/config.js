import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobsOptions } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withBackgrounds } from '@storybook/addon-backgrounds';
import { withOptions } from '@storybook/addon-options';
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

// Option defaults:
addDecorator(
  withOptions({
    name: 'Web-Toolkit',
    url: 'https://github.com/EurosportDigital/web-toolkit',
    goFullScreen: false,
    showStoriesPanel: true,
    showAddonPanel: true,
    showSearchBox: false,
    addonPanelInRight: false,
    sortStoriesByKind: true,
    hierarchySeparator: /\/|\./,
    hierarchyRootSeparator: /\|/,
    sidebarAnimations: true,
    selectedAddonPanel: undefined, // The order of addons in the "Addon panel" is the same as you import them in 'addons.js'. The first panel will be opened by default as you run Storybook
    enableShortcuts: true, // true by default
  })
);

addDecorator(ThemeDecorator);
addDecorator(
  withKnobsOptions({
    escapeHTML: false,
  })
);
addDecorator(
  withBackgrounds([
    { name: 'default', value: colors.brandPlus2, default: true },
    { name: 'coreLightMinus1', value: colors.coreLightMinus1 },
  ])
);

configure(loadStories, module);
