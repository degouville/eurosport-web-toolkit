import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { Adobe, HeartbeatInit, JwPlayer } from '../..';
import ScriptInjector from '../ScriptInjector';
import withVideoAnalytics from '../../hocs/withVideoAnalytics';
import AdobeHeartbeatAnalytics from '../../lib/AdobeHeartbeatAnalytics/AdobeHeartbeatAnalytics';
import { getBasePropsWithAds } from '../JwPlayer/index.stories';
import {
  heartbeatConfig,
  programStartDateTime,
  videoMetadata,
} from '../../lib/AdobeHeartbeatAnalytics/AdobeHeartbeatAnalytics.mock';

const indexStories = storiesOf('Components|Adobe', module);

const JWPlayerWithHeartbeatAnalytics = withVideoAnalytics(JwPlayer);

const HeartbeatWithJWPlayer = () => {
  const [isJwp, setIsJwp] = useState(false);

  return (
    <>
      <HeartbeatInit callback={() => setIsJwp(true)} />
      {isJwp && <JWPlayerWithAnalytics />}
    </>
  );
};

const JWPlayerWithAnalytics = () => {
  const analytics = new AdobeHeartbeatAnalytics(heartbeatConfig, videoMetadata, programStartDateTime);
  return <JWPlayerWithHeartbeatAnalytics {...getBasePropsWithAds()} analytics={analytics} />;
};

const innerHTML = `
if(typeof(_satellite) != 'undefined'){
  _satellite.pageBottom();
}
`;

indexStories
  .add('Adobe', () => <Adobe src={text('src', 'url.toscript.js')} isServerSide={false} />)
  .add('with JWPlayer', () => (
    <>
      <HeartbeatWithJWPlayer {...getBasePropsWithAds()} />
      <ScriptInjector isServer={false} id="satellite-script" innerHTML={innerHTML} injectPlace="body" />
    </>
  ));
