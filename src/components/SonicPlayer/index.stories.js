import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object } from '@storybook/addon-knobs';
import SonicPlayer from './index';

const env = {
  clientName: text('ClientName', 'test-site'),
  host: text('Host', 'eu1-test.disco-api.com'),
  realm: text('SonicRealm', 'eurosport'),
  subscribeUrl: text('SubscribeUrl', 'eu1-test.disco-api.com'),
  authConfig: text('AuthConfig', 'auth-dev'),
};

const freewheelAdParams = {
  networkID: 511712,
  profileId: '511712:euro_sport_com_web',
  serverURL: 'https://7cee0.v.fwmrm.net/ad/g/1',
  country: 'France',
};

const getBaseProps = () => ({
  entityId: text('EntityId', '140125729'),
  streamType: text('StreamType', 'VIDEO'),
  env: object('env', env),
});

const getBasePropsWithAds = () => ({
  ...getBaseProps(),
  freewheelAdParams: object('FreewheelAdParams', freewheelAdParams),
});

const stories = storiesOf('Components|SonicPlayer', module);

stories
  .add('default', () => <SonicPlayer {...getBaseProps()} />)
  .add('with ads', () => <SonicPlayer {...getBasePropsWithAds()} />);
