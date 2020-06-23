import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import ScriptInjector from '../ScriptInjector';
import { HeartbeatInit, JWPlayerETP, withVideoAnalytics } from '../..';
import AdobeHeartbeatAnalytics from '../../lib/AdobeHeartbeatAnalytics/AdobeHeartbeatAnalytics';
import { getBaseProps } from '../JWPlayerETP/index.stories';
import {
  customMetadata,
  heartbeatConfig,
  programStartDateTime,
  requiredMetadata,
} from '../../lib/AdobeHeartbeatAnalytics/AdobeHeartbeatAnalytics.mock';

const indexStories = storiesOf('Components|Heartbeat', module);

const JWPlayerETPWithHeartbeatAnalytics = withVideoAnalytics(JWPlayerETP);

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
  const analytics = new AdobeHeartbeatAnalytics(heartbeatConfig, requiredMetadata, programStartDateTime);

  const props = {
    ...getBaseProps(),
    onReady: () => analytics.onReady(customMetadata),
    onAdBreakStart: analytics.onAdBreakStart,
    onAdBreakComplete: analytics.onAdBreakComplete,
    onAdStart: analytics.onAdStart,
    onAdTime: analytics.onAdTime,
    onAdComplete: analytics.onAdComplete,
    onPlay: analytics.onPlay,
    onPause: analytics.onPause,
  };

  return <JWPlayerETPWithHeartbeatAnalytics {...props} analytics={analytics} />;
};

const innerHTML = `
if(typeof(_satellite) != 'undefined'){
  _satellite.pageBottom();
}
`;

indexStories.add('default', () => (
  <>
    <HeartbeatWithJWPlayer {...getBaseProps()} />
    <ScriptInjector isServer={false} id="satellite-script" innerHTML={innerHTML} injectPlace="body" />
  </>
));
