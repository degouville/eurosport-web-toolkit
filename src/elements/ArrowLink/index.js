import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import Chevron from 'src/assets/chevron.component.svg';
import Arrow from 'src/assets/right-arrow.component.svg';

const StyledChevron = styled(Chevron)`
  margin-left: 6px;

  path {
    fill: currentColor;
  }
`;

const StyledArrow = styled(Arrow)`
  margin-left: 6px;
  vertical-align: middle;
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
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1.27px;
  line-height: 24px;
  white-space: nowrap;
`;

const getArrow = arrowType => {
  switch (arrowType) {
    case 'chevron':
      return <StyledChevron />;
    case 'arrow':
      return <StyledArrow />;

    default:
      return null;
  }
};

const ArrowLink = ({ children, arrowType, ...props }) => (
  <LinkComponent {...props}>
    {children}
    {getArrow(arrowType)}
  </LinkComponent>
);

ArrowLink.displayName = 'ArrowLink';

ArrowLink.defaultProps = {
  arrowType: 'chevron',
};

ArrowLink.propTypes = {
  children: PropTypes.node.isRequired,
  arrowType: PropTypes.oneOf(['arrow', 'chevron', '']),
};

export default ArrowLink;
