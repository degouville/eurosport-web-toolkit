import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import * as breakpoints from '../../breakpoints';

export const StyledSetsSchedule = styled.p`
  padding: 0 6px 0 16px;
  flex: none;
  text-align: right;
  color: ${({ theme }) => theme.typo.primary.color};
  font-size: 12px;
  ${breakpoints.large(`
    font-size: 14px;
  `)};
`;

export const StyledDate = styled.span`
  opacity: 0.7;
`;

export const StyledTime = styled.b`
  opacity: 0.8;
  font-weight: bold;
`;

export const SetsSchedule = ({ schedule: { date, time } }) => (
  <StyledSetsSchedule>
    <StyledDate>{date}</StyledDate>
    <br />
    <StyledTime>{time}</StyledTime>
  </StyledSetsSchedule>
);

export const setsScheduleType = PropTypes.shape({
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
});
SetsSchedule.propTypes = {
  schedule: setsScheduleType.isRequired,
};

export default SetsSchedule;
