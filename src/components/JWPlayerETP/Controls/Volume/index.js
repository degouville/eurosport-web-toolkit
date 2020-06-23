import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { withTheme } from 'emotion-theming';
import { isMobile } from 'react-device-detect';
import * as breakpoints from 'src/breakpoints';
import VolumeOff from 'src/assets/icon-volume-off.svg';
import VolumeMedium from 'src/assets/icon-volume-medium.svg';
import VolumeHigh from 'src/assets/icon-volume-high.svg';
import BarControlWrapper from '../UI/barControlWrapper';
import Icon from '../UI/icon';
import Slider from '../Slider';
import Dropdown from '../Dropdown';
import { BOTTOM_BAR_HEIGHT_DESKTOP, BOTTOM_BAR_HEIGHT_MOBILE } from '../constants';
import useVolumeWithDelay from './useVolumeWithDelay';

/* eslint-disable jsx-a11y/mouse-events-have-key-events */

const getVolumeIcon = (volume, mute) => {
  if (mute === true) return VolumeOff;
  if (volume < 50) return VolumeMedium;
  return VolumeHigh;
};

export const Volume = ({ volume, onVolume, mute, theme, onMute }) => {
  const [showVolume, setShowVolume] = useVolumeWithDelay(false);

  const onMouseOver = useCallback(() => {
    setShowVolume(true);
  }, [setShowVolume]);

  const onMouseOut = useCallback(() => {
    setShowVolume(false);
  }, [setShowVolume]);

  const onVolumeClick = useCallback(() => {
    isMobile && mute && onVolume(100);
    onMute(!mute);
  }, [mute, onMute, onVolume]);

  return (
    <BarControlWrapper onMouseOver={!isMobile ? onMouseOver : null} onMouseOut={!isMobile ? onMouseOut : null} medium>
      {showVolume && (
        <DropdownContainer>
          <Dropdown bottomDisplay>
            <VolumeSliderContainer>
              <Slider
                max={100}
                onChange={onVolume}
                min={0}
                value={mute === true ? 0 : volume}
                defaultValue={100}
                {...theme.playerControls.volume}
              />
            </VolumeSliderContainer>
          </Dropdown>
        </DropdownContainer>
      )}
      <Icon onClick={onVolumeClick} src={getVolumeIcon(volume, mute)} alt="Volume" />
    </BarControlWrapper>
  );
};

Volume.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object.isRequired,
  onVolume: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  onMute: PropTypes.func.isRequired,
  mute: PropTypes.bool.isRequired,
};

export const DropdownContainer = styled.div`
  position: absolute;
  bottom: ${BOTTOM_BAR_HEIGHT_MOBILE - 8}px;
  ${breakpoints.small(`
    bottom: ${BOTTOM_BAR_HEIGHT_DESKTOP - 8}px;
  `)};
`;

const VolumeSliderContainer = styled.div`
  height: 100px;
`;

export default withTheme(Volume);
