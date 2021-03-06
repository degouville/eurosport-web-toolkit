import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';
import styled from 'react-emotion';
import { Betting } from '../..';
import { doubleChoiceData, tripleChoiceData, alternativeLogo } from './mock';

const betting = storiesOf('Components|Betting', module);

const Wrapper = styled.div`
  max-width: 633px;
`;

betting
  .add('Double choice', () => (
    <Wrapper>
      <Betting {...object('data', doubleChoiceData)} customAttr={object('custom link attribute', { name: 'value' })} />
    </Wrapper>
  ))
  .add('Triple choice', () => (
    <Wrapper>
      <Betting {...object('data', tripleChoiceData)} customAttr={object('custom link attribute', { name: 'value' })} />
    </Wrapper>
  ))
  .add('Alternative brand', () => (
    <Wrapper>
      <Betting {...object('data', alternativeLogo)} customAttr={object('custom link attribute', { name: 'value' })} />
    </Wrapper>
  ));
