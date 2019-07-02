import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import ChannelIcon from '../ChannelIcon';
import { suitGray } from '../../colors';
import { medium } from '../../breakpoints';

export const StyledDetails = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  color: ${suitGray};
  font-size: 11px;

  svg {
    width: auto;
    height: 100%;
  }

  ${medium(css`
    font-size: 14px;
    line-height: 20px;
  `)};
`;

export const StyledIconWrapper = styled.div`
  padding: 10px;
  padding-left: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.15);
  height: 15px;

  ${medium(css`
    padding: 15px;
    padding-left: 0;
    height: 23px;
  `)};
`;

export const StyledText = styled.div`
  padding: 10px;

  ${medium(css`
    padding: 15px;
  `)};
`;

const ProgramDetails = ({ callsign, textDetail }) => (
  <StyledDetails>
    {callsign && (
      <StyledIconWrapper>
        <ChannelIcon type={callsign} />
      </StyledIconWrapper>
    )}
    <StyledText>{textDetail}</StyledText>
  </StyledDetails>
);

ProgramDetails.defaultProps = {
  callsign: 'E',
};

ProgramDetails.propTypes = {
  callsign: PropTypes.string,
  textDetail: PropTypes.string.isRequired,
};

export default ProgramDetails;
