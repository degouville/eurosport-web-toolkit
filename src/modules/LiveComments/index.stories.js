import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object } from '@storybook/addon-knobs';
import { LiveComments } from '../..';

import mockData from './mock/livecomments';

storiesOf('Modules|LiveComments', module).add('comments', () => (
  <LiveComments
    labelPlayButton={text('labelPlayButton', 'watch this video')}
    livecomments={object('livecomments', mockData.livecomments)}
  />
));
