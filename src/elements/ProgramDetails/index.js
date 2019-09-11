import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import ChannelIcon from '../ChannelIcon';
import { coreNeutral4 } from '../../colors';
import { medium } from '../../breakpoints';

export const StyledDetails = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  color: ${coreNeutral4};
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
  height: 15px;
  padding: 10px 0;

  ${medium(css`
    padding: 15px 0;
    height: 23px;
  `)};
`;

export const StyledText = styled.div`
  padding: 10px 10px 10px 0;

  ${medium(css`
    padding: 15px 15px 15px 0;
  `)};
`;

export const StyledSeparator = styled.div`
  width: 1px;
  background: rgba(255, 255, 255, 0.15);
  margin: 0 10px;
  align-self: stretch;
  flex-shrink: 0;
`;

const ProgramDetails = ({ customIcon, callsign, textDetail, className }) => (
  <StyledDetails className={className}>
    {callsign && (
      <>
        <StyledIconWrapper>
          <ChannelIcon type={callsign} />
        </StyledIconWrapper>
        <StyledSeparator />
      </>
    )}
    {!callsign && customIcon && (
      <>
        {customIcon}
        <StyledSeparator />
      </>
    )}
    <StyledText>{textDetail}</StyledText>
  </StyledDetails>
);

ProgramDetails.defaultProps = {
  callsign: 'E',
  className: undefined,
  customIcon: null,
};

ProgramDetails.propTypes = {
  className: PropTypes.string,
  callsign: PropTypes.string,
  customIcon: PropTypes.node,
  textDetail: PropTypes.string.isRequired,
};

export default ProgramDetails;
