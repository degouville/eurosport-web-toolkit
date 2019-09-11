import React, { Component } from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import ScoreBlock from 'src/components/ScoreBlock';
import SimpleTabs from 'src/modules/SimpleTabs';
import { coreNeutral9 } from 'src/colors';
import Grid from 'src/elements/Grid';
import * as types from 'src/types';

const StyledMatches = styled.div``;
const StyledSimpleTabs = styled.div`
  margin: 1em 0 1em 0;
`;
const StyledScoreBlock = styled.div`
  margin: 2em 0 2em 0;
`;
const StyledHr = styled.div`
  background-color: ${coreNeutral9};
  width: 100%;
  height: 1px;
  margin: 1em 0;
`;

class RoundTableMobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: props.initialTab,
    };
  }

  changeTab = (_href, tabIndex) => {
    this.setState({ currentTab: tabIndex });
  };

  render() {
    const { currentTab } = this.state;
    const { matches: rawMatches, tabs, className } = this.props;
    const currentRound = [...tabs][currentTab].href || 1;
    const isCurrentRound = number => ({ round }) => +number === round.number;
    const matches = rawMatches.filter(isCurrentRound(currentRound));
    const hasMatches = matches && !!matches.length;
    const hasTabs = tabs && !!tabs.length;
    return (
      <div className={className}>
        {hasTabs && (
          <Grid.Row>
            <Grid.Column>
              <StyledSimpleTabs>
                <SimpleTabs initialTabIndex={currentTab} onItemSelected={this.changeTab} tabs={tabs} />
              </StyledSimpleTabs>
            </Grid.Column>
          </Grid.Row>
        )}

        <StyledHr />

        {hasMatches && (
          <Grid.Row>
            <Grid.Column>
              <StyledMatches>
                {matches.map(match => (
                  <StyledScoreBlock key={match.id}>
                    <ScoreBlock.ScoreBlock {...match} hasButton={false} />
                  </StyledScoreBlock>
                ))}
              </StyledMatches>
            </Grid.Column>
          </Grid.Row>
        )}
      </div>
    );
  }
}

RoundTableMobile.propTypes = {
  matches: PropTypes.arrayOf(
    PropTypes.shape({
      ...types.scoreBlock,
      round: PropTypes.shape(types.round),
    })
  ).isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape(types.simpleTab)).isRequired,
  initialTab: PropTypes.number,
  className: PropTypes.string,
};

RoundTableMobile.defaultProps = {
  initialTab: 0,
  className: undefined,
};

export default RoundTableMobile;
