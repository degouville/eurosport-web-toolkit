import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import LiveVideoHero from '.';
import { beforeEventLabels } from '../../elements/Labels/mockData/labels';

const liveVideoHeroStories = storiesOf('Modules|LiveVideoHero', module);

liveVideoHeroStories.add('default', () => (
  <LiveVideoHero
    backgroundImageUrl={text(
      'backgroundImageUrl',
      'https://i.eurosport.com/taiga/MagicBox/Crop/16_9/0_20190612-103247.jpeg?w=1030'
    )}
    // eslint-disable-next-line no-console
    onPlayIconClick={action('onPlayIconClick')}
    labels={object('labels', beforeEventLabels)}
    title={text('title', 'Athletics: Marathon des Sables')}
    programCallSign={text('programCallSign', 'E2NO')}
    programDetails={text('programDetails', '14:00 - 16:00')}
    isPlayerLoading={boolean('isPlayerLoading', false)}
    videoPlayerMode={boolean('videoPlayerMode', false)}
  />
));
