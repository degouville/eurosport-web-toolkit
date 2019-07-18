import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import errorIcon from 'src/assets/error-icon.svg';

const ErrorBanner = ({ message }) => (
  <MainContainer>
    <Border />
    <Icon src={errorIcon} alt="errorIcon" />
    <Text>{message}</Text>
  </MainContainer>
);

ErrorBanner.propTypes = {
  message: PropTypes.string.isRequired,
};

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  border: 1px solid ${({ theme }) => theme.banner.error.borderColor};
  background-color: ${({ theme }) => theme.banner.error.backgroundColor};
`;

const Border = styled.div`
  height: 100%;
  width: 5px;
  background-color: ${({ theme }) => theme.banner.error.borderColor};
`;

const Icon = styled.img`
  margin-top: 9px;
  margin-left: 17px;
  height: 24px;
  width: 24px;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.banner.error.textColor};
  font-family: ${({ theme }) => theme.banner.error.fontFamily};
  font-size: 16px;
  line-height: 24px;
  margin: 9px 18px 15px 12px;
  flex: 1;
`;

export default ErrorBanner;
