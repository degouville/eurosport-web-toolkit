/* eslint-disable no-underscore-dangle */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text } from '@storybook/addon-knobs';
import { Quantcast } from '../..';
import translation from './mockData/quantcast-translation.json';

const quantcastStories = storiesOf('Quantcast', module).addDecorator(withInfo);

quantcastStories.add('Quantcast', () => (
  <Quantcast scriptUrl={text('scriptUrl', 'https://quantcast.mgr.consensu.org/v14/cmp.js')} cmpConf={translation} />
));
