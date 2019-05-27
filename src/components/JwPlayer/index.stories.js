import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object } from '@storybook/addon-knobs';
import { JwPlayer } from '../..';

const freewheelAdParams = {
  adManagerURL: 'https://mssl.fwmrm.net/p/eurosport_js/AdManager.js',
  serverURL: 'https://7cee0.v.fwmrm.net/ad/g/1',
  networkID: 511712,
  fwassetId: 2,
  profileId: '511712:euro_sport_com_web',
  sectionId: 'www.eurosport.co.uk_desktop_video',
  video_targeting: 'live_stream',
  auth: 'premium',
  sport: '',
  afid: '146895011',
  vdur: 12300,
  _fw_gdpr: 0,
  _fw_gdpr_consent: '',
};

const getBaseProps = () => ({
  scriptUrl: text('ScriptUrl', 'https://dist.eurosportdigital.com/production/v3.7.1/eurosport-web-player.js'),
  configurationUrl: text('ConfigurationUrl', 'https://olympicsfeed.eurosport.com/web/eurosport.com/configuration.json'),
  entityId: text('EntityId', 'E1FR'),
  streamType: text('StreamType', 'channel_live'),
  prefLang: text('PrefLang', 'fr'),
  title: text('Title', 'Test title'),
  subscribeUrl: text('SubscribeUrl', 'https://www.eurosportplayer.com/subscribe'),
});

// eslint-disable-next-line import/prefer-default-export
export const getBasePropsWithAds = () => ({
  ...getBaseProps(),
  freewheelAdParams: object('FreewheelAdParams', freewheelAdParams),
});

const stories = storiesOf('Components|JwPlayer', module);

stories
  .add('default', () => <JwPlayer {...getBaseProps()} />)
  .add('with ads', () => <JwPlayer {...getBasePropsWithAds()} />);
