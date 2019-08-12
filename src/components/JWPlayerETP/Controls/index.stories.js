import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, number } from '@storybook/addon-knobs';
import { actions } from '@storybook/addon-actions';
import Controls from './index';

const stories = storiesOf('Components|JWPlayerETP', module);

const events = actions('onForward', 'onRewind', 'onPlay', 'onPause', 'onFullscreenChange', 'onSeek');

stories.add('Controls default', () => {
  const rewindCounts = text('rewindCounts', null);
  return (
    <Controls
      isLive={boolean('isLive', true)}
      rewindCounts={rewindCounts === '' ? null : rewindCounts}
      isFullscreen={boolean('isFullscreen', false)}
      seekMax={number('seekMax', 100)}
      seekMin={number('seekMin', 0)}
      seekPosition={number('seekPosition', 50)}
      {...events}
    />
  );
});
