import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { actions, action } from '@storybook/addon-actions';
import { JWPlayerETP } from 'src';
import VideoPlayerModal from '../../modules/VideoPlayerModal';
import LoginWithMarketing from '../../modules/LoginWithMarketing';
import { createDefaultProps } from '../../modules/LoginWithMarketing/index.stories';

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

const withVideoPlayerModal = Component => props => (
  <VideoPlayerModal onClose={action('onClose')}>
    <Component {...createDefaultProps()} {...props} />
  </VideoPlayerModal>
);

// eslint-disable-next-line import/prefer-default-export
export const getBaseProps = newProps => {
  const jwplayerId = text('ScriptId (jwplayerId)', 'DWNosgcz');
  return {
    prefLang: text('PrefLang', 'fr'),
    locale: text('locale', 'fr'),
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
    loginEndpoints: {
      forgotPasswordUrl: 'https://eurosport.fr',
      subscribeUrl: 'https://eurosport.fr',
      needHelpUrl: 'https://eurosport.fr',
    },
    LoginComponent: withVideoPlayerModal(LoginWithMarketing),
    recaptchaSiteKey: text('recaptchaSiteKey', '6LeHaK0UAAAAAF5SxiYjhFNMDpTKy4B8Mc_kWgiM'),
    ...events,
    ...newProps,
  };
};

const stories = storiesOf('Components|JWPlayerETP', module);

stories.add('JWPlayerETP default', () => <JWPlayerETP {...getBaseProps()} />);
