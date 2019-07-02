import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import ChannelIcon from '../ChannelIcon';
import { suitGray } from '../../colors';

const StyledDetails = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  color: ${suitGray};
  * :nth-child(2) {
    margin-left: 10px;
    padding-left: 10px;

    padding: 8px;
  }
`;
const StyledIconWrapper = styled.div`
  padding: ${props => `${props.iconPadding}px`};
  padding-left: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.15);
`;

const StyledText = styled.div`
  font-size: ${props => `${props.fontSize}px`};
`;

const ProgramDetails = ({ callsign, textDetail, iconHeight, iconPadding, fontSize }) => (
  <StyledDetails>
    <StyledIconWrapper iconPadding={iconPadding}>
      <ChannelIcon type={callsign} height={iconHeight} />
    </StyledIconWrapper>
    <StyledText fontSize={fontSize}>{textDetail}</StyledText>
  </StyledDetails>
);

ProgramDetails.defaultProps = {
  iconHeight: 23,
  iconPadding: 15,
  fontSize: 14,
};

ProgramDetails.propTypes = {
  callsign: PropTypes.string.isRequired,
  textDetail: PropTypes.string.isRequired,
  iconHeight: PropTypes.number,
  iconPadding: PropTypes.number,
  fontSize: PropTypes.number,
};

export default ProgramDetails;
