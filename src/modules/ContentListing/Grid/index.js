import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import * as colors from '../../../colors';
import { H2 } from '../../../typography';
import Link from '../../../elements/Link';
import { ReactComponent as Chevron } from '../../../assets/chevron.svg';
import { Column, Row, Container } from '../../../elements/Grid';

const StyledContainer = styled(Container)`
  margin: 48px 0;
`;

const StyledColumn = styled(Column)`
  margin-bottom: 20px;
`;

export const StyledTitle = styled(H2)`
  color: ${colors.coreLightBase};
  margin-bottom: 24px;
  margin-left: 5px;
`;

const StyledHeading = styled.div`
  display: flex;
  align-items: baseline;
`;

export const StyledChevron = styled(Chevron)`
  margin-left: 6px;

  path {
    fill: currentColor;
  }
`;

export const StyledLink = styled(Link)`
  margin-left: 40px;
  text-decoration: none;
  color: ${colors.coreLightBase};
  border-bottom: 2px solid currentColor;
  :hover,
  :active {
    color: ${colors.coreLightBase};
  }
`;

const Grid = ({ title, subLink, children, ...props }) => (
  <StyledContainer {...props}>
    <Row>
      <Column tiny="full">
        <StyledHeading>
          {title && <StyledTitle>{title}</StyledTitle>}
          {subLink && (
            <StyledLink href={subLink.href} linkComponent={subLink.linkComponent}>
              {subLink.text}
              <StyledChevron />
            </StyledLink>
          )}
        </StyledHeading>
      </Column>
    </Row>

    <Row>
      {React.Children.map(children, item => (
        <StyledColumn key={item.key} tiny="full" medium="6" large="4" wide="3">
          {item}
        </StyledColumn>
      ))}
    </Row>
  </StyledContainer>
);

Grid.displayName = 'Grid';

Grid.defaultProps = {
  title: '',
  subLink: undefined,
};

Grid.propTypes = {
  title: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  subLink: PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    linkComponent: PropTypes.func,
  }),
};

export default Grid;
