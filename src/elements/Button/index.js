import styled, { css } from 'react-emotion';
import { lighten, rgba } from 'polished';
import PropTypes from 'prop-types';
import ArrowLink from '../ArrowLink';

const Button = styled(ArrowLink)`
  background-color: ${({ theme, type }) => theme.button[type].backgroundColor};
  color: ${({ theme, type }) => theme.button[type].color};
  cursor: pointer;
  padding: 18px 10px;
  border-radius: 3px;
  font-size: 12px;
  letter-spacing: 2px;
  line-height: 14px;

  &:focus,
  &:visited,
  &:hover {
    color: ${({ theme, type }) => theme.button[type].color};
  }

  &:after {
    margin-left: 11px;
  }

  ${({ theme, type }) =>
    type === 'primary' &&
    css`
      &:hover {
        background-color: ${lighten(0.2, theme.button.primary.backgroundColor)};
      }
    `};

  ${({ theme, type }) =>
    type === 'secondary' &&
    css`
      border: 1px solid ${rgba(theme.button.secondary.color, 0.4)};
      &:hover {
        border-color: ${theme.button.secondary.color};
      }
    `};

  ${({ theme, type }) =>
    (type === 'form' || type === 'secondaryForm') &&
    css`
      &:hover {
        background-color: ${lighten(0.05, theme.button[type].backgroundColor)};
      }
      transition: all 150ms ease;
    `};
`;

Button.defaultProps = {
  type: 'primary',
};

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary', 'form', 'secondaryForm']),
};

Button.displayName = 'Button';

export default Button;
