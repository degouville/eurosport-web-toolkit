import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { large } from '../../breakpoints';

const StyledTitle = styled('h1')`
  font-size: 16px;
  color: white;

  ${large(css`
    font-size: 18px;
  `)};
`;
const StyledSubtitle = StyledTitle.withComponent('h2');
const StyledContent = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: white;
`;

const SeoText = ({ title, subtitle, content }) => (
  <>
    <StyledTitle>{title}</StyledTitle>
    <StyledSubtitle>{subtitle}</StyledSubtitle>
    <StyledContent>{content}</StyledContent>
  </>
);

SeoText.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default SeoText;
