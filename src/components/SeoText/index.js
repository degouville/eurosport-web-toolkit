import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { coreLightMinus1 } from 'src/colors';
import { H3 } from 'src/typography';

const StyledTitle = styled(H3)`
  color: ${coreLightMinus1};
`;
const StyledContent = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: ${coreLightMinus1};
`;

const SeoText = ({ title, subtitle, content }) => (
  <>
    <StyledTitle>{title}</StyledTitle>
    <StyledTitle>{subtitle}</StyledTitle>
    <StyledContent>{content}</StyledContent>
  </>
);

SeoText.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default SeoText;
