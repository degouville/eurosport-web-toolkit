import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';
import styled from 'react-emotion';
import { Betting } from '../..';
import { doubleChoiceData, tripleChoiceData, alternativeLogo } from './mock';

const betting = storiesOf('Components|Betting', module);

const Wrapper = styled.div`
  max-width: 500px;
`;

betting
  .add('Double choice', () => (
    <Wrapper>
      <Betting {...object('data', doubleChoiceData)} />
    </Wrapper>
  ))
  .add('Triple choice', () => (
    <Wrapper>
      <Betting {...object('data', tripleChoiceData)} />
    </Wrapper>
  ))
  .add('Alternative brand', () => (
    <Wrapper>
      <Betting {...object('data', alternativeLogo)} />
    </Wrapper>
  ));
