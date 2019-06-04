import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';
import { SubNavigation } from '../..';

const subNavigationStories = storiesOf('Modules|SubNavigation', module);
const items = [
  {
    name: 'Home',
    linkProps: {
      href: '/',
    },
  },
  {
    name: 'Watch',
    linkProps: {
      href: '/watch',
    },
  },
  {
    name: 'What is Eurosport?',
    linkProps: {
      href: '/what',
    },
  },
  {
    name: 'Log in',
    linkProps: {
      href: '/login',
    },
  },
];

subNavigationStories.add('base', () => <SubNavigation items={object('items', items)} />);
