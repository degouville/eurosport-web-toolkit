import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, number } from '@storybook/addon-knobs';
import { Dropdown } from 'src';
import styled from 'react-emotion';
import { dropdownOptions, initialOptionID } from './mock';

const dropdownStories = storiesOf('Components|Dropdown', module);

const StyledContainer = styled.div`
  padding-top: 200px;
`;

dropdownStories
  .add('Default', () => <Dropdown options={object('options', dropdownOptions)} />)
  .add('Default with 1 item', () => <Dropdown options={object('options', dropdownOptions.slice(0, 1))} />)
  .add('With Initial Option', () => (
    <Dropdown
      options={object('options', dropdownOptions)}
      initialOptionID={number('InitialOptionID', initialOptionID)}
    />
  ))
  .add('With top position', () => (
    <StyledContainer>
      <Dropdown isTop options={object('options', dropdownOptions)} />
    </StyledContainer>
  ))
  .add('With custom toggle', () => <Dropdown options={object('options', dropdownOptions)}>custom toggle</Dropdown>)
  .add('With custom width', () => <Dropdown options={object('options', dropdownOptions)} width="150px" />)
  .add('With heading', () => <Dropdown heading="heading" options={object('options', dropdownOptions)} />);
