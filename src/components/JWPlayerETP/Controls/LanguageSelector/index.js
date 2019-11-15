import React, { useCallback, useMemo } from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import Dropdown from 'src/components/Dropdown';
import languageIcon from 'src/assets/icon-language.svg';
import { audioTracks as audioTracksPropTypes } from 'src/types';
import Icon from '../UI/icon';
import useScreenInformation from '../useScreenInformation';

const StyledDropdownForMobile = styled(Dropdown)`
  bottom: auto;
  right: 0;
  top: 30px;
  width: 150px;

  :before {
    left: auto;
    margin-left: auto;
    right: 0;
  }

  ul {
    height: 100px;
  }
`;

export const LanguageSelector = ({ audioTracks, onAudioTrackChange }) => {
  const { isMobile } = useScreenInformation();

  const onLanguageSelected = useCallback(({ id }) => onAudioTrackChange(id), [onAudioTrackChange]);

  const options = useMemo(
    () =>
      audioTracks &&
      audioTracks.map(({ hlsjsIndex, name }) => ({
        id: hlsjsIndex,
        text: name,
      })),
    [audioTracks]
  );

  return isMobile ? (
    <StyledDropdownForMobile InitialOptionID={0} onItemSelected={onLanguageSelected} options={options}>
      <Icon alt="Language" src={languageIcon} />
    </StyledDropdownForMobile>
  ) : (
    <Dropdown
      heading="audio"
      InitialOptionID={0}
      isTop
      onItemSelected={onLanguageSelected}
      options={options}
      width="160px"
    >
      <Icon alt="Language" src={languageIcon} />
    </Dropdown>
  );
};

LanguageSelector.propTypes = {
  audioTracks: audioTracksPropTypes.isRequired,
  onAudioTrackChange: PropTypes.func.isRequired,
};

export default LanguageSelector;
