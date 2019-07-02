import React from 'react';
import PropTypes from 'prop-types';
import ScriptInjector from '../ScriptInjector';

const Adobe = ({ src, isServerSide }) => {
  const innerHTML = `
    if(typeof(_satellite) != 'undefined'){
      _satellite.pageBottom();
    }
  `;

  return (
    <>
      <ScriptInjector isServer={isServerSide} id="adobe-script" src={src} />
      {isServerSide && (
        <ScriptInjector isServer={false} id="satellite-script" innerHTML={innerHTML} injectPlace="body" />
      )}
    </>
  );
};

Adobe.propTypes = {
  src: PropTypes.string.isRequired,
  isServerSide: PropTypes.bool.isRequired,
};

export default Adobe;
