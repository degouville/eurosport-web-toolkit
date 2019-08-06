import styled from 'react-emotion';

const BarControlWrapper = styled.div`
  display: flex;
  height: 100%;
  ${({ medium }) => medium === true && 'width: 72px;'}
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default BarControlWrapper;
