import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { medium } from '../../breakpoints';
import { coreLightMinus1, mischka, coreLightBase } from '../../colors';
import { H3 } from '../../typography';
import { ReactComponent as Chevron } from '../../assets/chevron.svg';
import ScoreBlock, { scoreBlockType } from '../../components/ScoreBlock';
import Grid, { Column } from '../../elements/Grid';
import ViewMore, { StyledViewMoreButton, StyledViewMoreButtonWrapper } from '../ViewMore';

const StyledBreadcrumbElement = styled(H3)`
  color: ${mischka};
  display: inline-block;
  vertical-align: middle;
  font-size: 22px;
  ${medium(css`
    font-size: 26px;
  `)};
  &:last-child {
    color: ${coreLightMinus1};
  }
`;

const StyledChevron = styled(Chevron)`
  width: 10px;
  height: 12px;
  margin: 0 15px;
  display: inline-block;
  vertical-align: middle;
  path {
    fill: ${coreLightMinus1};
  }
`;

export const Breadcrumbs = styled(({ className, items }) => (
  <div className={className}>
    {items.map((item, i) =>
      i !== items.length - 1 ? (
        <React.Fragment key={item.name}>
          <StyledBreadcrumbElement>{item.name}</StyledBreadcrumbElement>
          <StyledChevron />
        </React.Fragment>
      ) : (
        <StyledBreadcrumbElement key={item.name}>{item.name}</StyledBreadcrumbElement>
      )
    )}
  </div>
))`
  font-size: 18px;
  line-height: 21px;
  font-weight: bold;

  ${medium(css`
    position: relative;
    font-size: 20px;
    line-height: 1.2;
    top: 1px;
  `)};
`;

const StyledMatchGrid = styled.div`
  margin-bottom: ${props => (props.matches.length > 6 ? '40px' : '23px')};

  ${StyledViewMoreButton} {
    display: ${props => (props.matches.length > 6 ? 'inline' : 'none')};
  }

  ${StyledViewMoreButtonWrapper} {
    margin: 20px 0;
  }
`;

const StyledColumn = styled(Column)`
  margin-bottom: 20px;
  ${medium(css`
    margin-bottom: 30px;
  `)};
`;

const StyledTitle = styled(H3)`
  margin-bottom: 30px;
  color: ${coreLightBase};
  font-size: 22px;
  text-transform: uppercase;
  ${medium(css`
    font-size: 26px;
  `)};
`;

const StyledViewMoreWrapper = styled.div`
  text-align: center;
`;

const MatchGrid = ({ title, matches, showMoreText, showLessText, eventName }) => {
  const firstMatches = matches.slice(0, 6);
  const restOfMatches = matches.slice(6);
  const breadcrumbs = [
    {
      name: title,
    },
    {
      name: eventName,
    },
  ];
  return (
    <StyledMatchGrid matches={matches}>
      <Grid.Row>
        <Grid.Column wideOffset="1">
          <StyledTitle>{eventName ? <Breadcrumbs items={breadcrumbs} /> : title}</StyledTitle>
        </Grid.Column>
      </Grid.Row>
      <StyledViewMoreWrapper>
        <ViewMore showMoreText={showMoreText} showLessText={showLessText}>
          <li>
            <Grid.Row>
              {firstMatches &&
                firstMatches.map((match, index) => (
                  <StyledColumn
                    tiny="full"
                    small="full"
                    medium="6"
                    large="6"
                    wide="5"
                    wideOffset={index % 2 === 0 ? '1' : '0'}
                    key={match.id}
                  >
                    <ScoreBlock.ScoreBlock {...match} displayLeftCircle={false} />
                  </StyledColumn>
                ))}
            </Grid.Row>
          </li>
          {restOfMatches.length > 0 && (
            <li>
              <Grid.Row>
                {restOfMatches.map((match, index) => (
                  <StyledColumn
                    tiny="full"
                    small="full"
                    medium="6"
                    large="6"
                    wide="5"
                    wideOffset={index % 2 === 0 ? '1' : '0'}
                    key={match.id}
                  >
                    <ScoreBlock.ScoreBlock {...match} displayLeftCircle={false} />
                  </StyledColumn>
                ))}
              </Grid.Row>
            </li>
          )}
        </ViewMore>
      </StyledViewMoreWrapper>
    </StyledMatchGrid>
  );
};

MatchGrid.defaultProps = {
  eventName: '',
};

MatchGrid.propTypes = {
  title: PropTypes.string.isRequired,
  matches: PropTypes.arrayOf(PropTypes.shape(scoreBlockType)).isRequired,
  showMoreText: PropTypes.string.isRequired,
  showLessText: PropTypes.string.isRequired,
  eventName: PropTypes.string,
};

export const AllMatches = ({
  t,
  liveMatches,
  upcomingMatches,
  finishedMatches,
  showMoreText,
  showLessText,
  eventName,
}) => (
  <>
    {liveMatches.length > 0 && (
      <MatchGrid
        title={t('match_page.allmatches.live_now')}
        matches={liveMatches}
        showMoreText={showMoreText}
        showLessText={showLessText}
        eventName={eventName}
      />
    )}
    {upcomingMatches.length > 0 && (
      <MatchGrid
        title={t('match_page.allmatches.upcoming')}
        matches={upcomingMatches}
        showMoreText={showMoreText}
        showLessText={showLessText}
        eventName={eventName}
      />
    )}
    {finishedMatches.length > 0 && (
      <MatchGrid
        title={t('match_page.allmatches.finished')}
        matches={finishedMatches}
        showMoreText={showMoreText}
        showLessText={showLessText}
        eventName={eventName}
      />
    )}
  </>
);

AllMatches.defaultProps = {
  eventName: '',
};

AllMatches.propTypes = {
  t: PropTypes.func.isRequired,
  liveMatches: PropTypes.arrayOf(PropTypes.shape(scoreBlockType)).isRequired,
  upcomingMatches: PropTypes.arrayOf(PropTypes.shape(scoreBlockType)).isRequired,
  finishedMatches: PropTypes.arrayOf(PropTypes.shape(scoreBlockType)).isRequired,
  showMoreText: PropTypes.string.isRequired,
  showLessText: PropTypes.string.isRequired,
  eventName: PropTypes.string,
};

export default withTranslation()(AllMatches);
