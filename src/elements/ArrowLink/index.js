import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { ReactComponent as Chevron } from '../../assets/chevron.svg';

const StyledChevron = styled(Chevron)`
  margin-left: 6px;

  path {
    fill: currentColor;
  }
`;

const LinkComponent = styled.a`
  color: ${({ theme }) => theme.link.color};
  &:focus,
  &:visited,
  &:hover {
    color: ${({ theme }) => theme.link.color};
  }
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  display: block;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1.27px;
  line-height: 24px;
  white-space: nowrap;
`;

const ArrowLink = ({ children, ...props }) => (
  <LinkComponent {...props}>
    {children}
    <StyledChevron />
  </LinkComponent>
);

ArrowLink.displayName = 'ArrowLink';

ArrowLink.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ArrowLink;
