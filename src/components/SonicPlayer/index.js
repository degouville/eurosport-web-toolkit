import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createPlayer } from '@discovery/sonic-player-eurosport/dist';

const useSonicPlayer = env => {
  const [sonicPlayer, setPlayer] = useState(null);

  useEffect(() => {
    const sonicEnv = {
      CLIENT_NAME: env.clientName,
      HOST: env.host,
      SONIC_REALM: env.sonicRealm || 'eurosport',
    };

    const auth = {
      host: env.subscribeUrl,
      configName: env.authConfig,
      returnUrlM: env.returnUrl || window.location.href,
    };

    /* const flags = {
      autoplay: true,
      streamFormat: 'HLS',
    };

    const freeWheelEnv = freewheelAdParams
      ? {
          FREEWHEEL_NETWORK_ID: freewheelAdParams.networkID,
          FREEWHEEL_PROFILE_ID: freewheelAdParams.profileId,
          FREEWHEEL_SERVER_URL: freewheelAdParams.serverURL,
          FREEWHEEL_COUNTRY: freewheelAdParams.country,
          SLOT_TIME_POST_FUZZINESS: 10,
          SLOT_TIME_PRE_FUZZINESS: 1,
        }
      : undefined; */

    const player = createPlayer({ env: sonicEnv, auth /* flags, freeWheelEnv */ });
    setPlayer({ player });
  }, []);

  return sonicPlayer ? sonicPlayer.player : null;
};

const Player = ({ env, entityId, streamType, freewheelAdParams }) => {
  const SonicPlayer = useSonicPlayer(env, freewheelAdParams);
  if (SonicPlayer === null) return null;

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        paddingTop: '56.25%',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          height: '100%',
          width: '100%',
        }}
      >
        <SonicPlayer streamId={{ id: entityId, type: streamType }} />{' '}
      </div>
    </div>
  );
};

Player.defaultProps = {
  freewheelAdParams: undefined,
};

Player.propTypes = {
  entityId: PropTypes.string.isRequired,
  streamType: PropTypes.string.isRequired,

  env: PropTypes.shape({
    clientName: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
    sonicRealm: PropTypes.string,
    subscribeUrl: PropTypes.string.isRequired,
    authConfig: PropTypes.string.isRequired,
    returnUrl: PropTypes.string,
  }).isRequired,

  freewheelAdParams: PropTypes.shape({
    networkID: PropTypes.number.isRequired,
    profileId: PropTypes.string.isRequired,
    serverURL: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }),
};

export default Player;
