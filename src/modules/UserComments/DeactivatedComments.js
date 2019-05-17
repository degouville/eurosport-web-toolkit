import React from 'react';
import styled, { css } from 'react-emotion';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { fontAlphaHeadline } from '../../typography';
import { medium } from '../../breakpoints';
import lockIcon from '../../assets/lock-icon.svg';
import { coreLightMinus1 } from '../../colors';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
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
`;

export const DeactivatedComments = ({ t }) => (
  <StyledWrapper>
    <StyledIcon src={lockIcon} alt="lock icon" />
    <div>{t('match_page.usercomments.deactivated_message')}</div>
  </StyledWrapper>
);

DeactivatedComments.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(DeactivatedComments);
