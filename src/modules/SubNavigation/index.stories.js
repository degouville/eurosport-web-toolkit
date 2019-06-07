import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';
import { SubNavigation } from '../..';

const subNavigationStories = storiesOf('Modules|SubNavigation', module);
// eslint-disable-next-line import/prefer-default-export
export const items = [
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
    name: 'Football',
    linkProps: {
      href: '/football',
    },
  },
  {
    name: 'Olympics',
    linkProps: {
      href: '/olympics',
    },
  },
  {
    name: 'Winter Sports',
    linkProps: {
      href: '/what',
    },
  },
  {
    name: 'Tennis',
    linkProps: {
      href: '/tennis',
    },
  },
  {
    name: 'Snooker',
    linkProps: {
      href: '/snooker',
    },
  },
  {
    name: 'Motorsports',
    linkProps: {
      href: '/motorsports',
    },
  },
  {
    name: 'Cycling',
    linkProps: {
      href: '/cycling',
    },
  },
  {
    name: 'BasketBall',
    linkProps: {
      href: '/basketball',
    },
  },
  {
    name: 'Log in',
    linkProps: {
      href: '/login',
    },
  },
  {
    name: 'Shop',
    linkProps: {
      href: '/shop',
    },
    type: 'shop',
  },
];

subNavigationStories.add('base', () => <SubNavigation items={object('items', items)} />);
