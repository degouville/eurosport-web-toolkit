import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

const Dropdown = ({ children, bottomDisplay }) => (
  <MainContainer>
    <StyledContainer bottomDisplay={bottomDisplay}>
      <StyledDropdownPick bottomDisplay={bottomDisplay} />
      <StyledDropdown>{children}</StyledDropdown>
    </StyledContainer>
  </MainContainer>
);

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  bottomDisplay: PropTypes.bool.isRequired,
};

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled.div`
  position: absolute;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ bottomDisplay }) => (bottomDisplay ? 'column-reverse' : 'column')};
  ${({ bottomDisplay }) => bottomDisplay && 'bottom: 100%;'}
`;

const StyledDropdownPick = styled.div`
  border: solid 1px ${({ theme }) => theme.playerControls.dropdown.border};
  ${({ bottomDisplay }) => bottomDisplay && 'border-left: none;'}
  ${({ bottomDisplay }) => bottomDisplay && 'border-top: none;'}
  ${({ bottomDisplay }) => !bottomDisplay && 'border-right: none;'}
  ${({ bottomDisplay }) => !bottomDisplay && 'border-bottom: none;'}
   
  border-radius: 3px;
  background-color: ${({ theme }) => theme.playerControls.dropdown.background};
  height: 10px;
  width: 10px;
  transform: ${({ bottomDisplay }) => (bottomDisplay ? ' translate(0%, -50%)' : 'translate(0%, 50%)')} rotate(45deg);
`;

export const StyledDropdown = styled.div`
  border: solid 1px ${({ theme }) => theme.playerControls.dropdown.border};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.playerControls.dropdown.background};
  padding: 18px;
`;

export default Dropdown;
