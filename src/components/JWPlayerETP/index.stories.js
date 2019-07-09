import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import ETPlayer from './index';

const getBaseProps = () => ({
  jwplayerId: text('ScriptId (jwplayerId)', 'YWx051uC'),
  elementId: text('elementId', 'ETPlayer'),
  prefLang: text('PrefLang', 'fr'),
  subscribeUrl: text('SubscribeUrl', 'https://www.eurosportplayer.com/subscribe'),
  videoData: {
    provider: 'sonic',
    videoId: text('videoId', 'eurosport-e14611684c0ch0'),
    sonic: {
      baseUrl: text('sonicBaseUrl', 'https://eu1-test.disco-api.com'),
      realm: text('sonicRealm', 'eurosport'),
    },
  },
});

const stories = storiesOf('Components|JWPlayerETP', module);

stories.add('default', () => <ETPlayer {...getBaseProps()} />);
