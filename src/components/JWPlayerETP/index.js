import React from 'react';
import PropTypes from 'prop-types';
import ETPlayerComponent from '@eurosport/toolkit-player';

const ETPlayer = ({ prefLang, videoData, jwplayerId, elementId }) => (
  <ETPlayerComponent locale={prefLang} videoData={videoData} jwplayerId={jwplayerId} elementId={elementId} />
);

ETPlayer.defaultProps = {
  jwplayerId: undefined,
};

ETPlayer.propTypes = {
  prefLang: PropTypes.string.isRequired,
  elementId: PropTypes.string.isRequired,
  jwplayerId: PropTypes.string,
  videoData: PropTypes.shape({
    provider: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
    sonic: PropTypes.shape({
      baseUrl: PropTypes.string.isRequired,
      realm: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ETPlayer;
