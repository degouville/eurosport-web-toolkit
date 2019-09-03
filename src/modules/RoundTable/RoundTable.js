import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { groupBy } from 'lodash';
import { H5, fontAlphaHeadline } from 'src/typography';
import ScoreBlock from 'src/components/ScoreBlock';
import { coreNeutral4, coreNeutral11 } from 'src/colors';
import Carousel from 'src/components/Carousel';
import * as types from 'src/types';

const StyledScoreBlockWrapper = styled.div`
  width: 350px;
  margin: 10px 0;
  & * {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const Flexed = styled.div`
  display: flex;
`;

const FlexedContainer = styled(Flexed)`
  height: 100%;
`;

const FlexedColum = styled(Flexed)`
  flex-direction: column;
`;

const Column = styled(FlexedColum)`
  height: 100%;
  justify-content: space-around;
`;

const Placeholder = styled.div`
  min-width: 30px;
  height: 100%;
  border: 2px solid ${coreNeutral11};
  box-sizing: border-box;
`;

const HalvedPlaceholder = styled(Placeholder)`
  height: ${({ matches }) => 100 / matches.length}%;
  border-left: none;
`;

const SingleDashPlaceholder = styled(Placeholder)`
  ${({ bottom }) => bottom && 'border-bottom: none'};
  border-right: none;
  border-left: none;
  border-top: none;
`;

const NeutralH5 = styled(H5)`
  color: ${coreNeutral4};
  ${fontAlphaHeadline};
  padding: 24px 0;
  margin-bottom: 60px;
`;

export const RoundColumn = ({ matches, round }) => (
  <FlexedColum>
    <NeutralH5>{round}</NeutralH5>
    <FlexedContainer>
      <Column>
        {matches.map(match => (
          <StyledScoreBlockWrapper key={match.id}>
            <ScoreBlock.ScoreBlock {...match} hasButton={false} />
          </StyledScoreBlockWrapper>
        ))}
      </Column>
      <Column>
        {matches.length > 1 &&
          Array.from(Array(matches.length / 2)).map((_, index) => (
            // key is linked to the 2 corresponding matches for React optimization
            <HalvedPlaceholder key={`${matches[index * 2].id}-${matches[index * 2 + 1].id}`} matches={matches} />
          ))}
      </Column>
      <Column>
        {matches.length > 1 &&
          matches.map((match, index) => <SingleDashPlaceholder key={match.id} bottom={index % 2} />)}
      </Column>
    </FlexedContainer>
  </FlexedColum>
);

const RoundTable = ({ matches, rounds, className, offsetLeft }) => {
  const groupedMatches = groupBy(matches, 'round.number');

  return (
    <FlexedContainer className={className}>
      <Carousel
        flex
        slideMargin={0}
        magneticMin={0.2}
        magneticMax={0.8}
        absoluteNavigation
        offsetLeft={offsetLeft}
        minWidthArrowDisplaying={700}
      >
        {Object.entries(groupedMatches).map(([round, matchList]) => (
          <RoundColumn key={round} round={rounds[round - 1] && rounds[round - 1].name} matches={matchList} />
        ))}
      </Carousel>
    </FlexedContainer>
  );
};

RoundColumn.defaultProps = {
  round: '',
};

RoundColumn.propTypes = {
  matches: PropTypes.arrayOf(types.scoreBlock).isRequired,
  round: PropTypes.string,
};

RoundTable.defaultProps = {
  className: undefined,
  offsetLeft: '0px',
};

RoundTable.propTypes = {
  matches: PropTypes.arrayOf(types.scoreBlock).isRequired,
  rounds: PropTypes.arrayOf(types.round).isRequired,
  className: PropTypes.string,
  offsetLeft: PropTypes.string,
};

export default RoundTable;
