import PropTypes from 'prop-types';
import React from 'react';
import minimise from 'src/assets/icon-minimise.svg';
import maximise from 'src/assets/icon-maximise.svg';
import BarControlWrapper from '../UI/barControlWrapper';
import Icon from '../UI/icon';

const ActionList = ({ isFullscreen, onFullscreenChange }) => (
  <>
    <BarControlWrapper medium>
      <Icon hidden={!isFullscreen} src={minimise} alt="minimise" onClick={onFullscreenChange} />
      <Icon hidden={isFullscreen} src={maximise} alt="maximise" onClick={onFullscreenChange} />
    </BarControlWrapper>
  </>
);

ActionList.propTypes = {
  isFullscreen: PropTypes.bool.isRequired,
  onFullscreenChange: PropTypes.func.isRequired,
};

export default ActionList;
