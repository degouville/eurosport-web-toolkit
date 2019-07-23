import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { actions } from '@storybook/addon-actions';
import ETPlayer from './index';

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
  'onLoginModalReady',
  'onLoginModalDone'
);

const getBaseProps = () => {
  const jwplayerId = text('ScriptId (jwplayerId)', 'DWNosgcz');
  return {
    prefLang: text('PrefLang', 'fr'),
    elementId: text('elementId', 'ETPlayer'),
    jwplayerData: { id: jwplayerId },
    videoData: {
      provider: 'sonic',
      id: text('videoId', 'eurosport-e14558529c9717131ch3'),
      sonic: {
        baseUrl: text('sonicBaseUrl', 'https://eu1-test.disco-api.com'),
        realm: text('sonicRealm', 'eurosport'),
      },
    },
    ...events,
  };
};

const stories = storiesOf('Components|JWPlayerETP', module);

stories.add('default', () => <ETPlayer {...getBaseProps()} />);
