import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import * as breakpoints from '../../breakpoints';
import * as colors from '../../colors';
import Button from '../../elements/Button';

const StyledWrapper = styled.footer`
  ${breakpoints.medium(css`
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  `)};
`;

const StyledButton = styled(Button)`
  font-size: 11px;
  line-height: 11px;
  ${breakpoints.medium(css`
    display: inline-block;
    padding: 11px 20px;
  `)};
`;

const StyledColumn = styled.div`
  font-size: 11px;
  text-align: center;
  margin-bottom: 20px;
  ${breakpoints.medium(css`
    text-align: right;
  `)};
`;

const StyledItems = styled.ul`
  margin: 30px 0 16px;
  padding-left: 0;
  ${breakpoints.medium(css`
    margin-top: 0;
  `)};
`;

const StyledItem = styled.li`
  list-style-type: none;
  border-top: 1px solid rgba(255, 255, 255, 0.15);

  &:last-of-type {
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }

  ${breakpoints.medium(css`
    display: inline-block;
    margin-left: 20px;
    border: none;

    &:last-of-type {
      border: none;
    }
  `)};
`;

const StyledLink = styled.a`
  padding: 15px 0;
  display: block;
  color: ${colors.athensGray};
  text-decoration: none;
  ${breakpoints.medium(css`
    display: inline-block;
    margin-left: 20px;
    padding: 0;
  `)};
  :hover {
    color: ${colors.white};
  }
`;

const StyledCopyright = styled.div`
  color: ${colors.manatee};
`;

const Footer = ({ faq, items, copyright, ...props }) => (
  <StyledWrapper {...props}>
    <StyledButton {...faq.linkProps} type="secondary" target="_blank">
      {faq.label}
    </StyledButton>
    <StyledColumn>
      <StyledItems>
        {items.map(
          item =>
            item.linkProps &&
            item.linkProps.href &&
            item.label && (
              <StyledItem key={item.id}>
                <StyledLink {...item.linkProps}>{item.label}</StyledLink>
              </StyledItem>
            )
        )}
      </StyledItems>
      {copyright && <StyledCopyright>{copyright}</StyledCopyright>}
    </StyledColumn>
  </StyledWrapper>
);

Footer.defaultProps = {
  items: [],
  copyright: null,
};

Footer.propTypes = {
  copyright: PropTypes.string,
  faq: PropTypes.shape({
    label: PropTypes.string,
    linkProps: PropTypes.shape({
      href: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      linkProps: PropTypes.shape({
        href: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
};

Footer.displayName = 'Footer';

export default Footer;
