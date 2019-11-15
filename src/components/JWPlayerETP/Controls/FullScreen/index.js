import PropTypes from 'prop-types';
import React from 'react';
import minimise from 'src/assets/icon-minimise.svg';
import maximise from 'src/assets/icon-maximise.svg';
import Icon from '../UI/icon';

const FullScreen = ({ isFullscreen, onFullscreenChange }) => (
  <>
    <Icon hidden={!isFullscreen} src={minimise} alt="minimise" onClick={onFullscreenChange} />
    <Icon hidden={isFullscreen} src={maximise} alt="maximise" onClick={onFullscreenChange} />
  </>
);

FullScreen.propTypes = {
  isFullscreen: PropTypes.bool.isRequired,
  onFullscreenChange: PropTypes.func.isRequired,
};

export default FullScreen;
