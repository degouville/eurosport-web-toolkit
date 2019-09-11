import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import * as colors from '../../colors';
import { fontAlphaHeadline, fontInterUi } from '../../typography';
import Button from '../../elements/Button';
import Spinner from '../../elements/Spinner';

const StyledContainer = styled.div`
  border-radius: 4px;
  background-color: ${colors.flawlessMahogany};
  position: relative;
  width: 100%;
  color: ${colors.coreLightMinus1};
  padding-bottom: 20px;
  padding-top: 10px;
  overflow: hidden;
`;

const StyledBackground = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 4px;
  background-color: ${colors.coreNeutral9};
  clip-path: polygon(0 11%, 100% 0%, 100% 100%, 0% 100%);
  z-index: 1;
`;

export const StyledTitle = styled.div`
  position: relative;
  font-size: 20px;
  ${fontAlphaHeadline};
  margin: 26px 19px;
  z-index: 2;
`;

export const StyledChoices = styled.div`
  position: relative;
  width: 100%;
  z-index: 2;
`;

const StyledChoice = styled(Button)`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 3;
  background-color: ${colors.blackRussian};
  border: 1px solid ${colors.nobel};
  border-radius: 24px;
  margin-bottom: 10px;
  margin-right: 19px;
  margin-left: 19px;
  color: ${colors.coreLightMinus1};
  ${fontInterUi};
  font-size: 12px;
  svg {
    display: none;
  }
  ${props =>
    props.showResults &&
    css`
      padding: 2px 0;
      border: 0px;
      border-radius: 0;
      background-color: ${colors.actionOneDarkMinus1};
      height: 48px;
      :hover {
        color: inherit;
        cursor: default;
      }
    `}
`;

const StyledResultBar = styled.div`
  background-color: ${colors.actionOneDarkBase};
  width: ${props => props.result};
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
`;

export const StyledChoiceText = styled.div`
  z-index: 5;
  width: 100%;
`;

export const StyledResultPercentage = styled.div`
  position: relative;
  left: 4%;
  z-index: 5;
`;

const StyledSpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSpinner = styled(Spinner)`
  svg {
    position: relative;
    z-index: 2;
  }
`;

class QuickPoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { choices, showResults } = this.props;
    if ((choices !== prevProps.choices && choices.length) || (showResults && !prevProps.showResults)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isLoading: false });
    }
  }

  handleClick = id => {
    const { showResults, onChoiceClick } = this.props;
    if (showResults !== true) {
      this.setState({ isLoading: true });
      onChoiceClick(id);
    }
  };

  render() {
    const { title, choices, showResults, className } = this.props;
    const { isLoading } = this.state;
    return (
      <StyledContainer className={className}>
        <StyledBackground />
        <StyledTitle>{title}</StyledTitle>
        {choices.length && isLoading !== true ? (
          <StyledChoices>
            {choices.map(choice => (
              <StyledChoice
                key={choice.id}
                onClick={() => this.handleClick(choice.id)}
                type="secondary"
                showResults={showResults}
                data-test="quickpoll-choice"
              >
                {showResults && (
                  <>
                    <StyledResultPercentage>{choice.result}</StyledResultPercentage>
                    <StyledResultBar result={choice.result} />
                  </>
                )}
                <StyledChoiceText>{choice.displayText}</StyledChoiceText>
              </StyledChoice>
            ))}
          </StyledChoices>
        ) : (
          <StyledSpinnerWrapper>
            <StyledSpinner color={colors.dodgerBlue} width="80px" />
          </StyledSpinnerWrapper>
        )}
      </StyledContainer>
    );
  }
}

QuickPoll.defaultProps = {
  showResults: false,
  className: undefined,
};

const choiceType = PropTypes.shape({
  id: PropTypes.number,
  displayText: PropTypes.string,
  result: PropTypes.string,
});

QuickPoll.propTypes = {
  title: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(choiceType).isRequired,
  showResults: PropTypes.bool,
  className: PropTypes.string,
  onChoiceClick: PropTypes.func.isRequired,
};

export default QuickPoll;
