import styled from 'react-emotion';

export const HorizontalSeparator = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.playerControls.separator};
`;

export const VerticalSeparator = styled.div`
  height: 100%;
  width: 1px;
  background-color: ${({ theme }) => theme.playerControls.separator};
`;
