import styled from 'react-emotion';
import { medium } from '../../breakpoints';

export const BaseText = styled.span`
  display: none;
  ${medium(`
    display: inline-block;
    font-size: 12px;
    margin-left: 5px;
    line-height: 19px;
    vertical-align: middle;`)}
`;

export const BaseImage = styled.span`
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
  width: 19px;
  height: 19px;
  padding: 3px;
  border-radius: 2px;
  background-repeat: no-repeat;
  background-position: center;
`;
