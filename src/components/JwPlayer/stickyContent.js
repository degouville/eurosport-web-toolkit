import React from 'react';
import styled, { css } from 'react-emotion';
import { H4 } from 'src/typography';
import { comet } from 'src/colors';
import { medium } from 'src/breakpoints';
import Labels from 'src/elements/Labels';
import SetsScore from 'src/components/ScoreBlock/SetsScore';

const StyledSetScore = styled(SetsScore)`
  background-color: ${comet};
  display: none;
  ${medium(css`
    display: inherit;
  `)}
`;

const StyledLabels = styled(Labels)`
  display: none;
  ${medium(css`
    display: flex;
  `)}
`;

// eslint-disable-next-line react/prop-types
const MatchStickyContent = ({ stickyTitle, stickyLabels, stickyScore }) => (
  <>
    <H4>{stickyTitle}</H4>
    <StyledLabels labels={stickyLabels} isSimpleMode />
    <StyledSetScore data={stickyScore} highlightLastSet baseFontSize="14px" />
  </>
);

export default MatchStickyContent;
