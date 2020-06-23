import React from 'react';
import { storiesOf } from '@storybook/react';
import theme from 'src/theme';
import { boolean } from '@storybook/addon-knobs';
import styled from 'react-emotion';
import Dropdown from './index';
import Slider from '../Slider';

const dropdownStories = storiesOf('Components|PlayerDropdown', module);

dropdownStories.add('Default', () => (
  <MainContainer>
    <Dropdown theme={theme.playerControls.dropdown} bottomDisplay={boolean('bottomDisplay', true)}>
      <SliderContainer>
        <Slider max={100} onChange={() => null} min={0} value={50} defaultValue={0} {...theme.playerControls.volume} />
      </SliderContainer>
    </Dropdown>
  </MainContainer>
));

const MainContainer = styled.div`
  margin-top: 200px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const SliderContainer = styled.div`
  height: 100px;
`;
