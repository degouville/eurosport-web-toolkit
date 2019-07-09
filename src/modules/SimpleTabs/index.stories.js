import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, number } from '@storybook/addon-knobs';
import SimpleTabs from '.';

const tabs = storiesOf('Modules|SimpleTabs', module);

const mockData = [
  {
    label: '1st Round',
    href: '#1',
  },
  {
    label: '2nd Round',
    href: '#2',
  },
  {
    label: '3rd Round',
    href: '#3',
  },
  {
    label: '4th Round',
    href: '#4',
  },
  {
    label: 'Quarterfinals',
    href: '#5',
  },
  {
    label: 'Semi-final',
    disabled: true,
    href: '#6',
  },
  {
    label: 'Final',
    disabled: true,
    href: '#7',
  },
];

tabs.add('default', () => (
  <SimpleTabs
    defaultTab={number('defaultTab', null)}
    /* eslint-disable-next-line no-console */
    onItemSelected={key => console.log(`You clicked the tab : ${key}`)}
    tabs={object('tabs', mockData)}
  />
));
