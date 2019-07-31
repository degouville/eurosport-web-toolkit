import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { groupBy } from 'lodash';

import { H5, fontAlphaHeadline } from 'src/typography';
import ScoreBlock from 'src/components/ScoreBlock';
import { coreNeutral4, coreNeutral11 } from 'src/colors';

const StyledScoreBlock = styled.div`
  min-width: 100%;
  margin: 10px 0;
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
  border-bottom: 1px solid ${coreNeutral11};
`;

export const RoundColumn = ({ matches, round }) => (
  <FlexedColum>
    <NeutralH5>{round}</NeutralH5>
    <FlexedContainer>
      <Column>
        {matches.map(match => (
          <StyledScoreBlock key={match.id}>
            <ScoreBlock.ScoreBlock matchUrl={match.matchUrl} data={match.data} hasButton={false} />
          </StyledScoreBlock>
        ))}
      </Column>
      <Column>
        {matches.length > 1 && Array.from(Array(matches.length / 2)).map(() => <HalvedPlaceholder matches={matches} />)}
      </Column>
      <Column>{matches.length > 1 && matches.map((any, index) => <SingleDashPlaceholder bottom={index % 2} />)}</Column>
    </FlexedContainer>
  </FlexedColum>
);

const RoundTable = ({ matches, rounds, className }) => {
  const groupedMatches = groupBy(matches, 'round');
  return (
    <FlexedContainer className={className}>
      {Object.entries(groupedMatches).map(([round, matchList]) => (
        <RoundColumn key={round} round={rounds[round - 1] && rounds[round - 1].name} matches={matchList} />
      ))}
    </FlexedContainer>
  );
};

RoundColumn.defaultProps = {
  round: '',
};

RoundColumn.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object).isRequired,
  round: PropTypes.string,
};

RoundTable.defaultProps = {
  className: undefined,
};

RoundTable.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object).isRequired,
  rounds: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
};

export default RoundTable;
