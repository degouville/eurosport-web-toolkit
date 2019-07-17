import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { Button } from '../..';

const indexStories = storiesOf('Elements|Button', module);

indexStories
  .add('primary', () => <Button type="primary">{text('Children', 'Children prop text')}</Button>)
  .add('secondary', () => <Button type="secondary">{text('Children', 'Children prop text')}</Button>)
  .add('form', () => <Button type="form">{text('Children', 'Children prop text')}</Button>);
