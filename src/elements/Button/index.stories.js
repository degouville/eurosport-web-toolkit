import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, radios } from '@storybook/addon-knobs';
import { Button } from '../..';
import { arrowTypeOptions } from '../ArrowLink/index.stories';

const indexStories = storiesOf('Elements|Button', module);

indexStories
  .add('primary', () => (
    <Button type="primary" arrowType={radios('arrowType', arrowTypeOptions, 'chevron')}>
      {text('Children', 'Children prop text')}
    </Button>
  ))
  .add('secondary', () => (
    <Button type="secondary" arrowType={radios('arrowType', arrowTypeOptions, 'chevron')}>
      {text('Children', 'Children prop text')}
    </Button>
  ))
  .add('form', () => (
    <Button type="form" arrowType={radios('arrowType', arrowTypeOptions, 'chevron')}>
      {text('Children', 'Children prop text')}
    </Button>
  ))
  .add('secondaryForm', () => (
    <Button type="secondaryForm" arrowType={radios('arrowType', arrowTypeOptions, 'chevron')}>
      {text('Children', 'Children prop text')}
    </Button>
  ));
