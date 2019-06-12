import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, boolean } from '@storybook/addon-knobs';
import { QuickPoll } from '../..';
import { choicesWithResults } from './mockData';

const quickPoll = storiesOf('Components|QuickPoll', module);

quickPoll.add('QuickPoll', () => (
  <QuickPoll
    title={text('title', 'Who will win the 2019 French Open?')}
    choices={object('choices', choicesWithResults)}
    showResults={boolean('showResults', false)}
    // eslint-disable-next-line no-console
    onChoiceClick={id => console.log(`You clicked on ${id}`)}
  />
));

quickPoll.add('QuickPoll with results', () => (
  <QuickPoll
    title={text('title', 'Who will win the 2019 French Open?')}
    choices={object('choices', choicesWithResults)}
    showResults={boolean('showResults', true)}
  />
));
