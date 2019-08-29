import React, { Component } from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import ScoreBlock, { scoreBlockType } from 'src/components/ScoreBlock';
import SimpleTabs from 'src/modules/SimpleTabs';
import { coreNeutral9 } from 'src/colors';
import Grid from 'src/elements/Grid';

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

export default class RoundTableMobile extends Component {
  state = {
    currentTab: 0,
  };

  static propTypes = {
    matches: PropTypes.arrayOf(
      PropTypes.shape({
        ...scoreBlockType,
        hasWon: PropTypes.bool,
        round: PropTypes.object,
      })
    ).isRequired,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        disabled: PropTypes.boolean,
        highlighted: PropTypes.boolean,
      })
    ).isRequired,
    initialTab: PropTypes.number,
    className: PropTypes.string,
  };

  static defaultProps = {
    initialTab: 0,
    className: undefined,
  };

  componentDidMount() {
    const { initialTab } = this.props;
    this.setState({ currentTab: initialTab });
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
