import React from 'react';
import PropTypes from 'prop-types';
import ScriptInjector from '../ScriptInjector';

const Adobe = ({ src, isServerSide, isDataLayerReady }) => {
  const innerHTML = `
    if(typeof(_satellite) != 'undefined'){
      _satellite.pageBottom();
    }
  `;

  return (
    <>
      <ScriptInjector isServer={isServerSide} id="adobe-script" src={src} />
      {isServerSide && isDataLayerReady && (
        <ScriptInjector isServer={false} id="satellite-script" innerHTML={innerHTML} injectPlace="body" />
      )}
    </>
  );
};

Adobe.defaultProps = {
  isDataLayerReady: false,
};

Adobe.propTypes = {
  src: PropTypes.string.isRequired,
  isServerSide: PropTypes.bool.isRequired,
  isDataLayerReady: PropTypes.bool,
};

export default Adobe;
