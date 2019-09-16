import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { white } from 'src/colors';
import { H3 } from 'src/typography';

const StyledTitle = styled(H3)`
  color: ${white};
`;
const StyledContent = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: ${white};
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
