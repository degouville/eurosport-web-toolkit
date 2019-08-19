import PropTypes from 'prop-types';
import React from 'react';
import minimise from 'src/assets/icon-minimise.svg';
import maximise from 'src/assets/icon-maximise.svg';
import BarControlWrapper from '../UI/barControlWrapper';
import Icon from '../UI/icon';

const ActionList = ({ isFullscreen, onFullscreenChange }) => (
  <>
    <BarControlWrapper onClick={onFullscreenChange} medium>
      {isFullscreen ? <Icon src={minimise} alt="minimise" /> : <Icon src={maximise} alt="maximise" />}
    </BarControlWrapper>
  </>
);

ActionList.propTypes = {
  isFullscreen: PropTypes.bool.isRequired,
  onFullscreenChange: PropTypes.func.isRequired,
};

export default ActionList;
