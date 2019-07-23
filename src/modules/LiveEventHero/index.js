import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { H1, H3 } from 'src/typography';

const StyledContent = styled.div`
  color: ${({ theme }) => theme.typo.primary.color};
`;

const LiveEventHero = ({ title, subtitle }) => (
  <StyledContent>
    <H1>{title}</H1>
    <H3>{subtitle}</H3>
  </StyledContent>
);

LiveEventHero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default LiveEventHero;
