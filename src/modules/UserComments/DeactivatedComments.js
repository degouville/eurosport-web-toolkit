import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { fontAlphaHeadline } from '../../typography';
import { medium } from '../../breakpoints';
import lockIcon from '../../assets/lock-icon.svg';
import { coreLightMinus1 } from '../../colors';

const StyledWrapper = styled.div`
  display: block;
  text-align: center;
  font-size: 12px;
  ${fontAlphaHeadline};
  color: ${coreLightMinus1};

  ${medium(css`
    font-size: 16px;
  `)};
`;

const StyledIcon = styled.img`
  margin-bottom: 20px;
  height: 46px;
  width: 46px;
`;

export const DeactivatedComments = ({ deactivatedText }) => (
  <StyledWrapper data-test="deactivated-comments">
    <StyledIcon src={lockIcon} alt="lock icon" />
    <div>{deactivatedText}</div>
  </StyledWrapper>
);

DeactivatedComments.defaultProps = {
  deactivatedText: 'Comments are deactivated for this publication',
};

DeactivatedComments.propTypes = {
  deactivatedText: PropTypes.string,
};

export default DeactivatedComments;
