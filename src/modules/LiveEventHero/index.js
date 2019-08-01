import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { H1, H3 } from 'src/typography';

const StyledContent = styled.div`
  color: ${({ theme }) => theme.typo.primary.color};
  text-transform: uppercase;
`;

export const StyledSubtitle = styled(H3)`
  margin-top: 20px;
  text-transform: uppercase;
`;

const LiveEventHero = ({ title, subtitle }) => (
  <StyledContent>
    <H1>{title}</H1>
    <StyledSubtitle>{subtitle}</StyledSubtitle>
  </StyledContent>
);

LiveEventHero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default LiveEventHero;
