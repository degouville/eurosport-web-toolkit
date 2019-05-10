import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { Spinner } from '../..';

const spinnerStories = storiesOf('Elements|Spinner', module);

spinnerStories.add('Spinner', () => <Spinner color={text('color', '#fff')} width={text('width', '80px')} />);
