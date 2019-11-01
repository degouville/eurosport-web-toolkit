import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import * as breakpoints from 'src/breakpoints';
import ErrorIcon from 'src/assets/error-icon.component.svg';
import { HorizontalSeparator } from 'src/components/JWPlayerETP/Controls/UI/separators';

const ErrorMessage = ({ message }) => (
  <MainContainer>
    <MessageContainer>
      <Icon />
      <Text>{message}</Text>
    </MessageContainer>
    <HorizontalSeparator />
  </MainContainer>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${({ theme }) => theme.playerControls.errorMessage.backgroundColor};
`;

const MessageContainer = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Icon = styled(ErrorIcon)`
  path {
    fill: ${({ theme }) => theme.playerControls.errorMessage.iconColor};
  }
  width: 72px;
  ${breakpoints.medium(css`
    width: 96px;
  `)}
`;

const Text = styled.p`
  margin: 19px 0 19px;
  color: ${({ theme }) => theme.playerControls.errorMessage.textColor};
  font-family: ${({ theme }) => theme.banner.error.fontFamily};
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  ${breakpoints.medium(css`
    margin: 27px 0 27px;
    font-size: 24px;
    line-height: 36px;
  `)}
`;

export default ErrorMessage;
