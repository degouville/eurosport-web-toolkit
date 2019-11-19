import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, number } from '@storybook/addon-knobs';
import { actions } from '@storybook/addon-actions';
import Controls from './index';

const stories = storiesOf('Components|JWPlayerETP', module);

const events = actions('onForward', 'onRewind', 'onPlay', 'onPause', 'onFullscreenChange', 'onSeek', 'onSkipAd');

stories.add('Controls default', () => {
  const rewindCounts = text('rewindCounts', null);
  const title = text('Title', 'title');
  const skipEnabled = boolean('skipEnabled', true);
  const skipTime = number('skipTime', 6);
  const isAdPlaying = boolean('isAdPlaying', true);

  return (
    <Controls
      isLive={boolean('isLive', true)}
      rewindCounts={rewindCounts === '' ? null : rewindCounts}
      isFullscreen={boolean('isFullscreen', false)}
      isBuffering={boolean('isBuffering', false)}
      isPlaying={boolean('isPlaying', false)}
      seekMax={number('seekMax', 100)}
      seekMin={number('seekMin', 0)}
      seekPosition={number('seekPosition', 50)}
      title={title}
      skipEnabled={skipEnabled}
      skipTime={skipTime}
      isAdPlaying={isAdPlaying}
      {...events}
    />
  );
});
