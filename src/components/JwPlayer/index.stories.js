import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { JwPlayer } from '../..';
import MatchStickyContent from './stickyContent';
import { liveMatchDataSet } from '../ScoreBlock/mockData/mockScoreBlockData';

const freewheelAdParams = {
  adManagerURL: 'https://mssl.fwmrm.net/p/eurosport_js/AdManager.js',
  serverURL: 'https://7cee0.v.fwmrm.net/ad/g/1',
  networkID: 511712,
  fwassetId: '2',
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

const labels = [
  {
    text: 'ROLAND GARROS',
    color: 'transparent',
  },
  {
    text: 'MENS',
    color: 'transparent',
  },
  {
    text: 'SEMI-FINAL',
    color: 'transparent',
  },
];

const getStickyContent = () => (
  <MatchStickyContent
    stickyTitle={text('stickyTitle', 'Tennis - Roland Garros')}
    stickyLabels={object('stickyLabels', labels)}
    stickyScore={object('stickyScore', liveMatchDataSet)}
  />
);

const getBaseProps = () => ({
  scriptUrl: text('ScriptUrl', 'https://dist.eurosportdigital.com/production/v3.7.1/eurosport-web-player.js'),
  configurationUrl: text('ConfigurationUrl', 'https://olympicsfeed.eurosport.com/web/eurosport.com/configuration.json'),
  entityId: text('EntityId', 'E1FR'),
  streamType: text('StreamType', 'channel_live'),
  prefLang: text('PrefLang', 'fr'),
  title: text('Title', 'Test title'),
  subscribeUrl: text('SubscribeUrl', 'https://www.eurosportplayer.com/subscribe'),
});

// eslint-disable-next-line react/prop-types
const Wrapper = ({ children }) => <div style={{ minHeight: '4000px' }}>{children}</div>;

// eslint-disable-next-line import/prefer-default-export
export const getBasePropsWithAds = () => ({
  ...getBaseProps(),
  freewheelAdParams: object('FreewheelAdParams', freewheelAdParams),
});

const stories = storiesOf('Components|JwPlayer', module);

stories
  .add('default', () => <JwPlayer {...getBaseProps()} />)
  .add('with ads', () => <JwPlayer {...getBasePropsWithAds()} />)
  .add('sticky mode', () => (
    <Wrapper>
      <JwPlayer
        {...getBaseProps()}
        stickyContent={text('stickyContent', 'Cyclisme - Vuelta Espagne 2019')}
        stickTo={select('stickTo', ['top', 'bottom'], 'bottom')}
        onStickyPlayerClick={() => action('you clicked on stickyPanel')}
      />
    </Wrapper>
  ))
  .add('sticky mode with enhanced info', () => (
    <Wrapper>
      <JwPlayer
        {...getBaseProps()}
        stickyContent={getStickyContent()}
        stickTo={select('stickTo', ['top', 'bottom'], 'bottom')}
        onStickyPlayerClick={() => action('you clicked on stickyPanel')}
      />
    </Wrapper>
  ));
