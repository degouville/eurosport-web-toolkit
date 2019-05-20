import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ScriptInjector from '../ScriptInjector';

const useJWPlayer = playerId => {
  const [player, setPlayer] = useState(null);
  const onPlayerScriptLoaded = useCallback(() => {
    const playerP = window.jwplayer(playerId).setup({
      file: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    });
    setPlayer(playerP);
  }, []);

  return {
    player,
    onPlayerScriptLoaded,
  };
};

const UniversalPlayer = ({ jwpScript }) => {
  const playerId = 'eurosport-universal-web-player';
  const { onPlayerScriptLoaded } = useJWPlayer(playerId);

  return (
    <>
      <ScriptInjector isServer={false} src={jwpScript} onLoad={onPlayerScriptLoaded} />
      <div id={playerId} />
    </>
  );
};

UniversalPlayer.defaultProps = {};

UniversalPlayer.propTypes = {
  jwpScript: PropTypes.string.isRequired,
  /* entityId: PropTypes.string.isRequired,
  streamType: PropTypes.string.isRequired,
  source: PropTypes.oneOf(['VDP', 'Sonic']), */
};

export default UniversalPlayer;
