import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, number } from '@storybook/addon-knobs';
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
  'onLoginComponentDone',
  'onSkipAd'
);

const withVideoPlayerModal = Component => props => (
  <VideoPlayerModal onClose={action('onClose')}>
    <Component {...createDefaultProps()} {...props} />
  </VideoPlayerModal>
);

// eslint-disable-next-line import/prefer-default-export
export const getBaseProps = (id, newProps) => {
  const jwplayerId = text('ScriptId (jwplayerId)', 'DWNosgcz');
  const title = text('Title', 'title');
  const skipEnabled = boolean('skipEnabled', true);
  const skipTime = number('skipTime', 6);

  return {
    prefLang: text('PrefLang', 'fr'),
    locale: text('locale', 'fr'),
    elementId: text('elementId', 'ETPlayer'),
    jwplayerData: { id: jwplayerId },
    videoData: {
      provider: 'sonic',
      id,
      sonic: {
        baseUrl: text('sonicBaseUrl', 'https://eu3-prod.disco-api.com'),
        realm: text('sonicRealm', 'eurosport'),
      },
    },
    loginEndpoints: {
      forgotPasswordUrl: 'https://eurosport.fr',
      subscribeUrl: 'https://eurosport.fr',
      needHelpUrl: 'https://eurosport.fr',
    },
    LoginComponent: withVideoPlayerModal(LoginWithMarketing),
    recaptchaSiteKey: text('recaptchaSiteKey', '6LfvErIUAAAAABlpqACnxRiUhqhX4p14sPxx_sKf'),
    skipEnabled,
    skipTime,
    title,
    ...events,
    ...newProps,
  };
};

const stories = storiesOf('Components|JWPlayerETP', module);

stories.add('JWPlayerETP default', () => {
  const id = text('VideoId', 'eurosport-e14690956c9757146ch0');

  return <JWPlayerETP {...getBaseProps(id)} />;
});

stories.add('JWPlayerETP with Ads', () => {
  const enableFreewheel = boolean('Enable Freewheel', true);
  const id = text('VideoId', 'eurosport-e14677243c9759747ch3');

  const freewheelConfig = {
    adManagerURL: 'https://mssl.fwmrm.net/p/eurosport_js/AdManager.js',
    serverURL: 'https://7cee0.v.fwmrm.net/ad/g/1',
    networkID: 511712,
    profileId: '511712:euro_sport_com_web',
    afid: '146895011',
    video_targeting: 'live_stream',
    auth: 'premium',
    vdur: 12300,
    enabled: true,
    fwassetId: id,
    sectionId: 'www.eurosport.fr_desktop_video',
    _fw_gdpr: '1',
    /* eslint-disable max-len */
    _fw_gdpr_consent:
      'BOoN3eROoN3eRAKAOBENCo-AAAAq57_______9______9uz_Ov_v_f__33e8__9v_l_7_-___u_-3zd4u_1vf99yfm1-7etr3tp_87ues2_Xur__79__3z3_9phP78k89r7337Ew-v-3o8Lg',
  };

  const customProps = {
    videoData: {
      provider: 'sonic',
      id,
      sonic: {
        baseUrl: text('sonic.baseUrl', 'https://eu3-prod.disco-api.com'),
        realm: 'eurosport',
      },
      freewheelAdParams: enableFreewheel && freewheelConfig,
    },
  };

  return <JWPlayerETP {...getBaseProps(id, customProps)} />;
});
