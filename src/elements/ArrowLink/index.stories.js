import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, radios } from '@storybook/addon-knobs';
import { ArrowLink } from '../..';

const indexStories = storiesOf('Elements|ArrowLink', module);

// eslint-disable-next-line import/prefer-default-export
export const arrowTypeOptions = {
  arrow: 'arrow',
  chevron: 'chevron',
  none: '',
};

indexStories.add('ArrowLink', () => (
  <ArrowLink href={text('href', 'goo.gl')} arrowType={radios('arrowType', arrowTypeOptions, 'chevron')}>
    {text('Label', 'Hello ArrowLink')}
  </ArrowLink>
));
