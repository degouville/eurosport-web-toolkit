import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, number } from '@storybook/addon-knobs';
import { Dropdown } from 'src';
import { dropdownOptions, initialOptionID } from './mock';

const dropdownStories = storiesOf('Components|Dropdown', module);

dropdownStories
  .add('Default', () => <Dropdown options={object('options', dropdownOptions)} />)
  .add('With Initial Option', () => (
    <Dropdown
      options={object('options', dropdownOptions)}
      initialOptionID={number('InitialOptionID', initialOptionID)}
    />
  ));
