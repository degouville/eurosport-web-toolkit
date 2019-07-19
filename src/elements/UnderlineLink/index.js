import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Link from 'src/elements/Link';

const UnderlineLink = ({ children, href }) => (
  <MainContainer>
    <LinkContainer href={href}>
      {children}
      <LinkBorder />
    </LinkContainer>
  </MainContainer>
);

UnderlineLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const LinkBorder = styled.div`
  background-color: ${({ theme }) => theme.underlineLink.color};
  height: 2px;
`;

const LinkContainer = styled(Link)`
  height: 28px;
  color: ${({ theme }) => theme.underlineLink.color};
  font-family: ${({ theme }) => theme.underlineLink.fontFamily};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 28px;
  flex: 1;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;

  &:hover {
    color: ${({ theme }) => theme.underlineLink.hoverColor};
  }

  &:hover ${LinkBorder} {
    background-color: ${({ theme }) => theme.underlineLink.hoverColor};
  }
`;

export default UnderlineLink;
