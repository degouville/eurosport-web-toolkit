import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import Grid from 'src/elements/Grid';
import Labels from 'src/elements/Labels';
import ViewMore, { StyledViewMoreButton, StyledViewMoreButtonWrapper } from '../ViewMore';
import { StyledColumn, StyledViewMoreWrapper, ShowMoreRow, MatchGrid } from '../AllMatches';

const StyledLiveGrid = styled.div`
  ${StyledViewMoreButton} {
    display: ${({ matches, matchesToShow }) => (matches.length > matchesToShow ? 'inline' : 'none')};
  }

  ${StyledViewMoreButtonWrapper} {
    margin: 20px 0;
  }

  ${StyledColumn} {
    margin-bottom: 15px;
  }
`;

const StyledLabels = styled(Labels)`
  margin-bottom: 17px;
`;

const LiveMatchesGrid = ({ matches, title, showMoreText, showLessText, matchesToShow, ...scoreBlockProps }) => {
  const firstMatches = matches.slice(0, matchesToShow);
  const restOfMatches = matches.slice(matchesToShow);

  return (
    <StyledLiveGrid matchesToShow={matchesToShow} matches={matches}>
      {title && (
        <Grid.Row>
          <Grid.Column wideOffset="1">
            <StyledLabels labels={title} isSimpleMode />
          </Grid.Column>
        </Grid.Row>
      )}
      <StyledViewMoreWrapper>
        <ViewMore showMoreText={showMoreText} showLessText={showLessText}>
          <ShowMoreRow matches={firstMatches} displayLeftCircle={false} scoreBlockProps={scoreBlockProps} />
          <ShowMoreRow matches={restOfMatches} displayLeftCircle={false} scoreBlockProps={scoreBlockProps} />
        </ViewMore>
      </StyledViewMoreWrapper>
    </StyledLiveGrid>
  );
};

LiveMatchesGrid.defaultProps = {
  title: '',
  matchesToShow: 2,
};

LiveMatchesGrid.propTypes = {
  ...MatchGrid.propTypes,
  title: PropTypes.string,
  matchesToShow: PropTypes.number,
};

export default LiveMatchesGrid;
