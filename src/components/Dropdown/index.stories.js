import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';
import Dropdown from '.';
import { dropdownOptions } from './mock';

const dropdownStories = storiesOf('Components|Dropdown', module);

dropdownStories.add('Default', () => <Dropdown options={object('options', dropdownOptions)} />);
