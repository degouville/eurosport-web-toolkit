import React, { useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { withTheme } from 'emotion-theming';
import * as breakpoints from 'src/breakpoints';
import VolumeOff from 'src/assets/icon-volume-off.svg';
import VolumeMedium from 'src/assets/icon-volume-medium.svg';
import VolumeHigh from 'src/assets/icon-volume-high.svg';
import BarControlWrapper from '../UI/barControlWrapper';
import Icon from '../UI/icon';
import Slider from '../Slider';
import Dropdown from '../Dropdown';
import { BOTTOM_BAR_HEIGHT_DESKTOP, BOTTOM_BAR_HEIGHT_MOBILE } from '../constants';
import useClickOutside from './useClickOutside';

const getVolumeIcon = (volume, mute) => {
  if (mute === true) return VolumeOff;
  if (volume < 50) return VolumeMedium;
  return VolumeHigh;
};

export const Volume = ({ volume, onVolume, mute, theme }) => {
  const [showVolume, setShowVolume] = useState(false);
  const [clickEnabled, setClickEnabled] = useState(true);
  const containerRef = useRef(null);

  const onMouseOver = useCallback(() => {
    setClickEnabled(false);
  }, [setClickEnabled]);

  const onMouseOut = useCallback(() => {
    setClickEnabled(true);
  }, [setClickEnabled]);

  const onVolumeClick = useCallback(() => {
    setShowVolume(!showVolume);
  }, [setShowVolume, showVolume]);

  const callback = useCallback(() => setShowVolume(false), [setShowVolume]);
  useClickOutside({ ref: containerRef, callback });

  return (
    <BarWithPointer innerRef={containerRef} medium onClick={clickEnabled ? onVolumeClick : null}>
      {showVolume && (
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        <DropdownContainer onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
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
      <Icon src={getVolumeIcon(volume, mute)} alt="Volume" />
    </BarWithPointer>
  );
};

Volume.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object.isRequired,
  onVolume: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  mute: PropTypes.bool.isRequired,
};

export const BarWithPointer = styled(BarControlWrapper)`
  cursor: pointer;
`;

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
