import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import ETPlayer from '../index';
import PlayerSkin from './index';

const events = actions(
  'onPlayerInstantiation',
  'onReady',
  'onPlay',
  'onPause',
  'onAdBreakStart',
  'onAdBreakComplete',
  'onAdStart',
  'onAdTime',
  'onError',
  'onSeek',
  'onSeeked',
  'onLoginComponentReady',
  'onLoginComponentDone'
);

const stories = storiesOf('Components|JWPlayerETP', module);

stories.add('PlayerSkin', () => {
  const title = text('Title', 'title');

  return (
    <ETPlayer
      loginEndpoints={{
        forgotPasswordUrl: 'https://eurosport.fr',
        subscribeUrl: 'https://eurosport.fr',
        needHelpUrl: 'https://eurosport.fr',
      }}
      locale="en"
      elementId="playerId"
      jwplayerData={{ id: 'DWNosgcz' }}
      videoData={{
        controls: false,
        provider: 'url',
        id: text('video', 'https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8'),
      }}
      {...events}
      PlayerControls={PlayerSkin}
      title={title}
    />
  );
});
