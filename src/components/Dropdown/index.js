import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import Chevron from 'src/assets/chevron.component.svg';
import { medium } from '../../breakpoints';
import { H3 } from '../../typography';

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const StyledOverlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1;

  display: none;
  ${({ isDropdownOpen }) =>
    isDropdownOpen &&
    css`
      display: block;
    `}
`;

export const StyledWrapper = styled.div`
  ${medium(css`
    width: fit-content;
  `)};
  position: relative;
`;

export const StyledText = styled(H3)`
  color: ${({ theme }) => theme.dropdown.label.color};
  text-transform: uppercase;
  ${medium(css`
    display: flex;
    align-items: center;
  `)}
`;

export const StyledArrow = styled(Chevron)`
  height: 12px;
  width: 12px;
  transform: rotate(90deg);
  margin-left: 5px;
  margin-top: 2px;
  path {
    fill: ${({ theme }) => theme.dropdown.label.color};
  }
`;

export const StyledDropdown = styled.div`
  position: absolute;
  width: calc(100% - 25px);
  bottom: -165px;
  ${medium(css`
    right: -183px;
    top: 42px;
    @-moz-document url-prefix() {
      right: -183px;
    }
    @supports (-ms-ime-align: auto) {
      right: unset;
      width: auto;
    }
    bottom: auto;
    width: fit-content;
  `)};
  display: none;
  z-index: 2;
  opacity: 0.95;
  align-self: flex-end;
  border: solid 1px ${({ theme }) => theme.dropdown.border};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.dropdown.background};
  padding: 17px 8px 12px 17px;
  ${({ isDropdownOpen }) =>
    isDropdownOpen &&
    css`
      display: block;
    `}
  &::before {
    content: '';
    position: absolute;
    width: 10px;
    border-top: 1px solid ${({ theme }) => theme.dropdown.border};
    border-left: 1px solid ${({ theme }) => theme.dropdown.border};
    border-radius: 1px;
    background: ${({ theme }) => theme.dropdown.background};
    height: 10px;
    display: block;
    margin-left: 50%;
    transform: translateX(-50%) rotate(45deg);
    top: -6px;
    left: 0;
  }
`;

const StyledUl = styled.ul`
  max-height: 130px;
  overflow-y: auto;
  overflow-x: hidden;

  ${medium(css`
    width: 350px;
  `)};

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => `${theme.scrollbar.color} ${theme.scrollbar.background}`};

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollbar.background};
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollbar.color};
    border-radius: 2px;
  }
`;

export const StyledLi = styled.li`
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.dropdown.list.selected.color : theme.dropdown.list.default.color};
  font-size: 14px;
  cursor: pointer;
  padding: 13px 0;
  margin-right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:first-of-type {
    padding-top: 0;
  }
  &:not(:last-of-type) {
    border-bottom: solid 1px ${({ theme }) => theme.dropdown.border};
  }
  &:hover {
    color: ${({ theme }) => theme.dropdown.list.selected.color};
  }
`;

export const StyledCheckMark = styled.span`
  color: ${({ theme }) => theme.dropdown.checkMark.color};
  margin: 0 0 0 1em;
`;

const StyledP = styled.p`
  width: 100%;
`;

class Dropdown extends React.Component {
  state = {
    isDropdownOpen: false,
    selectedOption: null,
  };

  componentWillMount() {
    this.initSelectedOption();
  }

  initSelectedOption = () => {
    const { options, initialOptionID } = this.props;
    const matchInitialID = initialID => ({ id }) => id === initialID;
    const initialOption = options.find(matchInitialID(initialOptionID));
    const selectedOption = initialOption || options[0];
    this.setState({ selectedOption });
  };

  onOptionClick = id => {
    const { options, onItemSelected } = this.props;
    const matchingOption = options.find(option => option.id === id);
    onItemSelected && onItemSelected(matchingOption);

    if (matchingOption) {
      this.setState({ selectedOption: matchingOption, isDropdownOpen: false });
    }
  };

  toggleOpen = () => {
    // eslint-disable-next-line no-unused-vars
    this.setState(state => ({
      isDropdownOpen: !state.isDropdownOpen,
    }));
  };

  render() {
    const { options } = this.props;
    const { isDropdownOpen, selectedOption } = this.state;
    return (
      <StyledWrapper>
        <StyledOverlay isDropdownOpen={isDropdownOpen} onClick={this.toggleOpen} />
        <StyledDropdown isDropdownOpen={isDropdownOpen}>
          <StyledUl>
            {options &&
              options.map(option => (
                <StyledLi
                  onClick={() => this.onOptionClick(option.id)}
                  isSelected={selectedOption.id === option.id}
                  key={option.id}
                >
                  <StyledP>{option.text}</StyledP>
                  {selectedOption.id === option.id && <StyledCheckMark> ✓</StyledCheckMark>}
                </StyledLi>
              ))}
          </StyledUl>
        </StyledDropdown>
        <StyledContainer onClick={this.toggleOpen}>
          <StyledText>
            {selectedOption.text}
            <StyledArrow />
          </StyledText>
        </StyledContainer>
      </StyledWrapper>
    );
  }
}

Dropdown.defaultProps = {
  onItemSelected: null,
  initialOptionID: null,
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
    })
  ).isRequired,
  initialOptionID: PropTypes.number,
  onItemSelected: PropTypes.func,
};

export default Dropdown;
